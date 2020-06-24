import React, { useMemo } from "react"
import Fuse from "fuse.js"
import styles from "./SkillsSection.module.css"

interface TagPillProps {
  name: string
  count: number
  active?: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const TagPill: React.FC<TagPillProps> = ({
  name,
  count,
  active = false,
  onClick,
}) => (
  <button onClick={onClick} className={[styles.tagPill].join("")}>
    {name}({count})
  </button>
)

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
  searchText: string
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onHardSkillTagClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
}

const SkillsSection: React.FC<Props> = ({
  skills,
  searchText,
  onSearchChange,
  onHardSkillTagClick,
}) => {
  const tagsForHardSkills = useMemo(() => {
    return skills.hard.reduce(
      (
        tagMap: { [key: string]: { name: string; count: number } },
        skillItem
      ) => {
        skillItem.tags.forEach(tag => {
          if (tagMap[tag]) {
            tagMap[tag] = {
              name: tag,
              count: tagMap[tag].count + 1,
            }
          } else {
            tagMap[tag] = {
              name: tag,
              count: 1,
            }
          }
        })
        return tagMap
      },
      {}
    )
  }, [skills])

  // const activeTags = useState(() => {})

  const fuse = new Fuse(skills.hard, {
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: ["name", "tags"],
  })

  const searchResults = fuse.search(searchText).map(({ item }) => item)

  const hardSkillsFiltered = searchText === "" ? skills.hard : searchResults

  console.log("tagsForHardSkills", tagsForHardSkills)
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
          {Object.values(tagsForHardSkills).map(({ name, count }) => (
            <TagPill name={name} count={count} onClick={onHardSkillTagClick} />
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
