import React from "react"
import { Link } from "gatsby"
import Image from "../../components/image"
import SEO from "../../components/seo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
import {
  faCode,
  faMusic,
  faPaintBrush,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons"
import Layout from "../../components/layout"

interface NavButtonProps {
  icon: IconDefinition
  linkTo?: string
}

// When I want to build animated transitions, look into the "navigate" function
// that you can pass into the Link component.
const NavButton: React.FC<NavButtonProps> = ({
  icon = faCode,
  linkTo = "/#",
}) => (
  <Link
    to={linkTo}
    className="nav-button border-white border-solid border-4 h-16 w-16 rounded-full flex justify-center"
  >
    <FontAwesomeIcon className="self-center text-xl" icon={icon} color="#fff" />
  </Link>
)

export default NavButton