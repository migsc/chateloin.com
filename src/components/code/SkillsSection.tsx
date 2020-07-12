import React, { useState, useEffect } from "react"
import styles from "./SkillsSection.module.css"
import TagPill from "./TagPill"
import {
  Tag,
  TagMap,
  HardSkill,
  SoftSkill,
  ClickEvent,
  ChangeEvent,
} from "../../types"
import { useHardSkillSearchResultsFiltered } from "../../hooks"
import HardSkillSearchResult from "./HardSkillSearchResult"
import SoftSkillListItem from "./SoftSkillListItem"

interface Props {
  activeSkillTab: string
  hardSkillsFiltered: HardSkill[]
  hardSkillTagsFiltered: Tag[]
  softSkills: SoftSkill[]
  onTabClick: (event: ClickEvent, tab: string) => void
  onSearchChange: (event: ChangeEvent) => void
  onHardSkillTagClick: (event: ClickEvent, tagName: string) => void
}

const SkillsSection: React.FC<Props> = ({
  activeSkillTab,
  hardSkillsFiltered,
  hardSkillTagsFiltered,
  softSkills,
  onTabClick,
  onSearchChange,
  onHardSkillTagClick,
}) => {
  return (
    <div className="mt-16 mb-16">
      <div className="mb-8 flex justify-between">
        <div>
          <h2>skills</h2>
        </div>
        <div className="flex">
          <button
            className={`mr-2 ${
              activeSkillTab === "hard" ? styles.skillTabActive : ""
            }`}
            onClick={e => onTabClick(e, "hard")}
          >
            hard
          </button>
          <div className="mr-2">/</div>
          <button
            className={`${
              activeSkillTab === "soft" ? styles.skillTabActive : ""
            }`}
            onClick={e => onTabClick(e, "soft")}
          >
            soft
          </button>
        </div>
      </div>
      <div className={`${activeSkillTab !== "hard" ? "hidden" : ""}`}>
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
          {hardSkillTagsFiltered.map((tag: Tag) => (
            <TagPill key={tag.name} {...tag} onClick={onHardSkillTagClick} />
          ))}
        </div>
        <div>
          {hardSkillsFiltered.map((skill: HardSkill) => (
            <HardSkillSearchResult key={skill.name} {...skill} />
          ))}
        </div>
      </div>
      <div className={`${activeSkillTab !== "soft" ? "hidden" : ""}`}>
        <div>
          {softSkills.map((skill: SoftSkill) => (
            <SoftSkillListItem key={skill.name} {...skill} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillsSection
