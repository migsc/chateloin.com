import React, { useMemo } from "react"
import Fuse from "fuse.js"
import styles from "./TagPill.module.css"
import { Tag } from "../../types"

interface TagPillProps extends Tag {
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tagName: string
  ) => void
}

const TagPill: React.FC<TagPillProps> = ({
  name,
  count,
  active = false,
  onClick,
}) => (
  <button
    onClick={e => onClick(e, name)}
    className={`${styles.tagPill} ${active ? styles.tagPillActive : ""}`}
  >
    {name}({count})
  </button>
)

export default TagPill
