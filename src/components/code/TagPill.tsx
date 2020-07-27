import React, { useMemo } from "react"
import * as styles from "./TagPill.module.css"

interface TagPillProps {
  name?: string
  count?: number
  active?: boolean
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tagName: string
  ) => void
}

console.log("styles", styles)

const TagPill: React.FC<TagPillProps> = ({
  name = "Tag",
  count = 0,
  active = false,
  onClick = () => {},
}) => {
  const disabled = count === 0
  return (
    <button
      disabled={disabled}
      onClick={e => onClick(e, name)}
      className={`${styles.tagPill} ${active ? styles.tagPillActive : ""} ${
        disabled ? styles.tagPillDisabled : ""
      }`}
    >
      {name}({count})
    </button>
  )
}

export default TagPill
