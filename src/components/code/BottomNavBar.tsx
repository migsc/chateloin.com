import React from "react"
import { Link } from "gatsby"
import {
  faLaptopCode,
  faQuestion,
  faBriefcase,
  faHammer,
  faShareAlt,
  faHeart,
  faCommentSmile,
} from "@fortawesome/pro-duotone-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnchorLink } from "gatsby-plugin-anchor-links"

import { Children } from "../../types"

interface NavItemProps {
  title: string
  icon: any // TODO specific type
  base: string
  href: string
  children?: Children
}

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
      className="block mt-4 lg:inline-block lg:mt-0 mr-4"
      // style={{ fontWeight: 100 }}
    >
      <div>
        <div className="text-center">
          <span style={{ color: "white" }}>
            <FontAwesomeIcon className="mr-1" icon={icon} color={"white"} />
          </span>
        </div>
        <div>
          <h6 className="text-center font-thin">{title}</h6>
          {children}
        </div>
      </div>
    </AnchorLink>
  )
}

const BottomNavBar = () => (
  <nav
    className="sticky bottom-0 items-center justify-between flex flex-row flex-wrap p-4 border-top border-white"
    style={{
      position: "fixed",
      width: "100%",
      borderTopWidth: `${1 / 64}rem`,

      backdropFilter: `blur(10px)`,
    }}
  >
    <div className="flex-grow flex items-center w-auto  flex-row justify-around">
      <NavItem icon={faLaptopCode} title="intro" href={"#intro"} />
      <NavItem icon={faBriefcase} title="job" href={"#job"} />
      <NavItem icon={faHammer} title="skills" href={"#skills"} />
      <NavItem icon={faHeart} title="projects" href={"#projects"} />
      <NavItem icon={faShareAlt} title="socials" href={"#socials"} />
    </div>
  </nav>
)

export default BottomNavBar
