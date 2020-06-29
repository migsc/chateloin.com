import { useState, useEffect } from "react"
import Fuse from "fuse.js"
import { Tag, TagMap, HardSkill } from "./types"
import {
  intersectionBy,
  intersection,
  mapValues,
  getTagMapFromTagNames,
} from "./utils"

interface TagMapActions {
  toggleActiveTag: (tagName: string) => void
}

type TagMapState = TagMap

export const useTagMap = (tags: string[]): [TagMapState, TagMapActions] => {
  const [state, setState]: [
    TagMapState,
    React.Dispatch<React.SetStateAction<TagMap>>
  ] = useState<TagMapState>({})

  useEffect(() => {
    setState(getTagMapFromTagNames(tags))
  }, [])

  const actions = {
    toggleActiveTag: (tagName: string): void => {
      setState({
        ...state,
        [tagName]: {
          ...state[tagName],
          active: !state[tagName].active,
        },
      })
    },
  }

  return [state, actions]
}

interface HardSkillSearchResults {
  tagsFiltered: Tag[]
  skillsFiltered: HardSkill[]
}

interface HardSkillSearchActions extends TagMapActions {}

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
  const [tagsByName, { toggleActiveTag }] = useTagMap(
    skills.map(({ tags: tagNames }) => tagNames).flat()
  )

  const activeTagNames = Object.values(tagsByName)
    .filter(({ active }) => active)
    .map(({ name }) => name)

  const searchResultsForName = fuseNameSearcher
    .search(searchText)
    .map(({ item }) => item)

  const searchResultsForTag = skills.filter(
    skill =>
      intersection(skill.tags, activeTagNames).length === activeTagNames.length
  )

  const skillsFiltered =
    searchText === "" && activeTagNames.length === 0
      ? skills
      : intersectionBy(
          searchResultsForName.length > 0
            ? searchResultsForName
            : searchResultsForTag,
          searchResultsForTag.length > 0 || activeTagNames.length > 0
            ? searchResultsForTag
            : searchResultsForName,
          "name"
        )

  const hardSkillTagsByNameFromSearchResults = getTagMapFromTagNames(
    skillsFiltered.map(({ tags: tagNames }) => tagNames).flat()
  )

  const tagsFiltered =
    searchText === "" && activeTagNames.length === 0
      ? Object.values(tagsByName)
      : Object.values(
          mapValues(tagsByName, (t: Tag) => ({
            ...t,
            count: hardSkillTagsByNameFromSearchResults[t.name]?.count ?? 0,
          }))
        )

  const actions = {
    toggleActiveTag,
  }

  return [
    {
      skillsFiltered,
      tagsFiltered,
    },
    actions,
  ]
}
