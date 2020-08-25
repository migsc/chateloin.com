import React, { ButtonHTMLAttributes } from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestion, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import * as styles from "./NavButton.module.css"

interface NavButtonProps {
  icon?: IconDefinition
  
  linkTo?: string
  onClick?: (event: ClickEvent) => void
  style?: any
  iconColor: string
}

// When I want to build animated transitions, look into the "navigate" function
// that you can pass into the Link component.
const NavButton: React.FC<NavButtonProps> = ({
  icon = faQuestion,
  linkTo = "/#",
  onClick,
  style = {},
  iconColor,
}) => {
  return onClick ? (
    <button
      href="#"
      className={styles.NavButton}
      style={style}
      onClick={onClick}
    >
      <FontAwesomeIcon
        light
        className={styles.icon}
        icon={icon}
        style={{ color: iconColor }}
        color={iconColor}
      />
    </button>
  ) : (
    <Link to={linkTo} className={styles.NavButton} style={style}>
      <FontAwesomeIcon
        light
        className={styles.icon}
        icon={icon}
        style={{ color: iconColor }}
        color={iconColor}
      />
    </Link>
  )
}

export default NavButton
