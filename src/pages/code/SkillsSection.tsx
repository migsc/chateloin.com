import React, { useState, useEffect } from "react"
import styles from "./SkillsSection.module.css"
import TagPill from "./TagPill"
import { Tag, TagMap, HardSkill } from "../../types"
import { useHardSkillSearchResultsFiltered } from "../../hooks"
import HardSkillSearchResult from "./HardSkillSearchResult"

interface Props {
  skills: {
    hard: HardSkill[]
    soft: any
  }
  hardSkillTagsByName: TagMap
  searchText?: string
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onHardSkillTagClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tagName: string
  ) => void
}

const SkillsSection: React.FC<Props> = ({
  skills,
  searchText = "",
  hardSkillTagsByName,
  onSearchChange,
  onHardSkillTagClick,
}) => {
  const hardSkillSearchResults = useHardSkillSearchResultsFiltered(
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
            <TagPill key={tag.name} {...tag} onClick={onHardSkillTagClick} />
          ))}
        </div>
        <div>
          {hardSkillSearchResults.skillsFiltered.map((skill: HardSkill) => (
            <HardSkillSearchResult key={skill.name} {...skill} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillsSection
