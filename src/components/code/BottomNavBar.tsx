import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import {
  faLaptopCode,
  faQuestion,
  faBriefcase,
  faHammer,
  faShareAlt,
  faHeart,
  faCommentSmile,
} from "@fortawesome/pro-light-svg-icons"
import {
  faLaptopCode as faLaptopCodeActive,
  faQuestion as faQuestionActive,
  faBriefcase as faBriefcaseActive,
  faHammer as faHammerActive,
  faShareAlt as faShareAltActive,
  faHeart as faHeartActive,
  faCommentSmile as faCommentSmileActive,
} from "@fortawesome/pro-duotone-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnchorLink } from "gatsby-plugin-anchor-links"
import FrostedGlass from "../../components/FrostedGlass"
import { Children } from "../../types"

interface NavItemProps {
  title: string
  icon: any // TODO specific type
  base: string
  href: string
  children?: Children
}

const NavItemContainer = styled.div`
  &:hover span {
    font-size: 1.4rem;
    color: #667eeaff;
  }
`

const NavItem: React.FC<NavItemProps> = ({
  title,
  icon = faQuestion,
  base,
  href = "#",
  children = "",
}) => {
  return (
    <AnchorLink
      title={title}
      to={`${href}`}
      className="block mt-4 mb-4 lg:inline-block"
    >
      <NavItemContainer>
        <div className="text-center">
          <span style={{ color: "white", transition: "0.3s" }}>
            <FontAwesomeIcon className="mr-1" icon={icon} color={"white"} />
          </span>
        </div>
        <div>
          <h6 style={{ transition: "0.3s" }} className="text-center font-thin">
            {title}
          </h6>
          {children}
        </div>
      </NavItemContainer>
    </AnchorLink>
  )
}

const BottomNavBar = () => (
  <nav
    className="sticky bottom-0"
    style={{
      width: "100%",
    }}
  >
    <FrostedGlass />
    <div
      style={{ zIndex: 0, background: "none", height: "4rem" }}
      className="flex-grow flex items-center w-auto flex-row justify-around"
    >
      <NavItem icon={faLaptopCode} title="intro" href={"#intro"} />
      <NavItem icon={faBriefcase} title="job" href={"#job"} />
      <NavItem icon={faHammer} title="skills" href={"#skills"} />
      <NavItem icon={faHeart} title="projects" href={"#projects"} />
      <NavItem icon={faShareAlt} title="socials" href={"#socials"} />
    </div>
  </nav>
)

export default BottomNavBar
