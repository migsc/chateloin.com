import React, { useMemo } from "react"
import * as styles from "./Button.module.css"

interface ButtonProps {
  children?: string
  disabled?: boolean
  active?: boolean
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tagName: string
  ) => void
}


const Button: React.FC<ButtonProps> = ({
  children = "Tag",
  disabled = false,
  active = false,
  onClick = () => {},
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${styles.tagPill} ${active ? styles.tagPillActive : ""} ${
        disabled ? styles.tagPillDisabled : ""
      }`}
    >
      {children}
    </button>
  )
}

export default Button
