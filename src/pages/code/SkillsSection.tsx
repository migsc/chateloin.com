import React, { useMemo } from "react"
import Fuse from "fuse.js"
import styles from "./SkillsSection.module.css"
import TagPill from "./TagPill"
import { Tag, TagMap } from "../../types"
import {
  intersectionBy,
  intersection,
  mapValues,
  getTagMapFromTagNames,
} from "../../utils"

interface HardSkillSearchResults {
  tagsFiltered: Tag[]
  skillsFiltered: HardSkill[]
}

const getHardSkillSearchResultsFiltered = (
  skills: HardSkill[],
  tagsByName: TagMap,
  searchText: string
): HardSkillSearchResults => {
  const nameSearcher = new Fuse(skills, {
    includeScore: true,
    keys: ["name"],
  })

  const activeTagNames = Object.values(tagsByName)
    .filter(({ active }) => active)
    .map(({ name }) => name)

  const searchResultsForName = nameSearcher
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

const HardSkillSearchResult: React.FC<HardSkill> = ({ name, tags }) => (
  <p className="mb-4" key={name}>
    <span className="font-bold">{name}</span> <br /> {tags.join(", ")}
  </p>
)

interface HardSkill {
  name: string
  tags: string[]
}

interface Props {
  skills: {
    hard: HardSkill[]
    soft: any
  }
  hardSkillTagsByName: TagMap
  searchText: string
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onHardSkillTagClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tagName: string
  ) => void
}

const SkillsSection: React.FC<Props> = ({
  skills,
  searchText,
  hardSkillTagsByName,
  onSearchChange,
  onHardSkillTagClick,
}) => {
  const hardSkillSearchResults = getHardSkillSearchResultsFiltered(
    skills.hard,
    hardSkillTagsByName,
    searchText
  )

  return (
    <div className="mt-16 mb-16">
      <h2 className="mb-8">skills</h2>
      <div>
        <div className="mb-4">
          <label>
            Search:
            <input
              style={{ background: "#000" }}
              type="text"
              name="search"
              onChange={onSearchChange}
            />
          </label>
        </div>
        <div>
          {hardSkillSearchResults.tagsFiltered.map((tag: Tag) => (
            <TagPill {...tag} onClick={onHardSkillTagClick} />
          ))}
        </div>
        <div>
          {hardSkillSearchResults.skillsFiltered.map(({ name, tags }) => (
            <HardSkillSearchResult name={name} tags={tags} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillsSection
