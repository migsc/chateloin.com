import React, { useMemo } from "react"
import Fuse from "fuse.js"
import styles from "./SkillsSection.module.css"
import TagPill from "./TagPill"
import { Tag, TagMap } from "../../types"

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
  // const activeTags = useState(() => {})

  const fuse = new Fuse(skills.hard, {
    includeScore: true,
    keys: ["name", "tags"],
  })
  const activeTagNames = Object.values(hardSkillTagsByName)
    .filter(({ active }) => active)
    .map(({ name }) => name)

  const searchResults = fuse
    .search(searchText + " " + activeTagNames.join(" "))
    .map(({ item }) => item)

  const hardSkillsFiltered =
    searchText === "" && activeTagNames.length === 0
      ? skills.hard
      : searchResults

  console.log("activeTagNames", activeTagNames)
  console.log("hardSkillTagsByName", hardSkillTagsByName)
  console.log("searchText", searchText)
  console.log("searchResults", searchResults)

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
          {Object.values(hardSkillTagsByName).map((tag: Tag) => (
            <TagPill {...tag} onClick={onHardSkillTagClick} />
          ))}
        </div>
        <div>
          {hardSkillsFiltered.map(({ name, tags }) => (
            <HardSkillSearchResult name={name} tags={tags} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillsSection
