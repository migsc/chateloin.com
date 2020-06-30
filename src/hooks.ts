import { useState, useEffect } from "react"
import Fuse from "fuse.js"
import { Tag, TagMap, HardSkill } from "./types"
import {
  intersectionBy,
  intersection,
  mapValues,
  getTagMapFromTagNames,
  without,
} from "./utils"

interface TagWithSkills extends Tag {
  skills: HardSkill[]
}

interface TagToSkillsMap {
  [key: string]: TagWithSkills
}

const getSkillsByTags = (skills: HardSkill[]): TagToSkillsMap => {
  let map: TagToSkillsMap = {}

  skills.forEach(skill => {
    skill.tags.forEach(tagName => {
      if (!map[tagName]) {
        map[tagName] = {
          name: tagName,
          active: false,
          count: 1,
          skills: [skill],
        }
      } else {
        map[tagName] = {
          ...map[tagName],
          count: map[tagName].count + 1,
          skills: [...map[tagName].skills, skill],
        }
      }
    })
  })

  return map
}

interface HardSkillSearchResults {
  tagsFiltered: Tag[]
  skillsFiltered: HardSkill[]
}

interface HardSkillSearchActions {
  toggleActiveTag: (tagName: string) => void
}

export const useHardSkillSearchResultsFiltered = (
  skills: HardSkill[],
  searchText: string
): [HardSkillSearchResults, HardSkillSearchActions] => {
  // TODO: You could save a few rerenders with if you use effect and state hooks
  // to derive the HardSkillSearchResults returned from prop changes in
  // searchText and tagsByName (i.e. active tag flags)
  const [fuseNameSearcher] = useState(
    new Fuse(skills, {
      includeScore: true,
      keys: ["name"],
    })
  )

  const [tagMapWithSkills, setSkillsByTag] = useState<TagToSkillsMap>({})
  const [activeTagNames, setActiveTagNames] = useState<string[]>([])

  useEffect(() => {
    setSkillsByTag(getSkillsByTags(skills))
  }, [skills])

  const actions = {
    toggleActiveTag: (tagName: string): void => {
      setSkillsByTag({
        ...tagMapWithSkills,
        [tagName]: {
          ...tagMapWithSkills[tagName],
          active: !tagMapWithSkills[tagName].active,
        },
      })
      setActiveTagNames(
        !tagMapWithSkills[tagName].active
          ? [...activeTagNames, tagName]
          : without(activeTagNames, tagName)
      )
    },
  }

  const skillsFiltered = intersectionBy(
    searchText === ""
      ? skills
      : fuseNameSearcher.search(searchText).map(({ item }) => item),
    ...activeTagNames.map(tagName => tagMapWithSkills[tagName].skills),
    "name"
  )

  let tagsFiltered

  if (searchText === "" && activeTagNames.length === 0) {
    tagsFiltered = Object.values(tagMapWithSkills)
  } else {
    const tagCountsFromSkillsFiltered = skillsFiltered.reduce(
      (map: { [key: string]: number }, skill: HardSkill) => {
        let mapIncremented = map

        skill.tags.forEach(tagName => {
          mapIncremented = {
            ...mapIncremented,
            [tagName]: mapIncremented[tagName]
              ? mapIncremented[tagName] + 1
              : 1,
          }
        })

        return mapIncremented
      },
      {}
    )

    tagsFiltered = Object.values(
      mapValues(tagMapWithSkills, (t: Tag) => ({
        ...t,
        count: tagCountsFromSkillsFiltered[t.name] ?? 0,
      }))
    )
  }

  return [
    {
      skillsFiltered,
      tagsFiltered,
    },
    actions,
  ]
}
