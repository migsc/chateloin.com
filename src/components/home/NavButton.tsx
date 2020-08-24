import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestion, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import * as styles from "./NavButton.module.css"

interface NavButtonProps {
  icon?: IconDefinition
  linkTo?: string
  onClick?: (event: ClickEvent) => void
}

// When I want to build animated transitions, look into the "navigate" function
// that you can pass into the Link component.
const NavButton: React.FC<NavButtonProps> = ({
  icon = faQuestion,
  linkTo = "/#",
  onClick,
}) => {
  return onClick ? (
    <button href="#" className={styles.NavButton} onClick={onClick}>
      <FontAwesomeIcon className={styles.icon} icon={icon} color="#fff" />
    </button>
  ) : (
    <Link to={linkTo} className={styles.NavButton}>
      <FontAwesomeIcon className={styles.icon} icon={icon} color="#fff" />
    </Link>
  )
}

export default NavButton
