import { useState } from "react"
import Fuse from "fuse.js"
import { Tag, TagMap, HardSkill } from "./types"
import {
  intersectionBy,
  intersection,
  mapValues,
  getTagMapFromTagNames,
} from "./utils"

interface HardSkillSearchResults {
  tagsFiltered: Tag[]
  skillsFiltered: HardSkill[]
}

export const useHardSkillSearchResultsFiltered = (
  skills: HardSkill[],
  tagsByName: TagMap,
  searchText: string
): HardSkillSearchResults => {
  // TODO: You could save a few rerenders with if you use effect and state hooks
  // to derive the HardSkillSearchResults returned from prop changes in
  // searchText and tagsByName (i.e. active tag flags)
  const [fuseNameSearcher] = useState(
    new Fuse(skills, {
      includeScore: true,
      keys: ["name"],
    })
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

  return {
    skillsFiltered,
    tagsFiltered,
  }
}
