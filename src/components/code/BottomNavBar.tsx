import React, { useState } from "react"
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
import FrostedGlass from "../FrostedGlass"
import { Children } from "../../types"

interface NavItemProps {
  title: string
  icon: any // TODO specific type
  base: string
  href: string
  children?: Children
}

const NavItemContainer = styled.div`
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  cursor: pointer;

  &:hover span {
    font-size: 1.2rem;
  }

  &:active {
    opacity: 1;
  }
`

const NavItem: React.FC<NavItemProps> = ({
  title,
  icon = faQuestion,
  base,
  href = "#",
  children = "",
  active,
  onPress,
}) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 2000)
    onPress()
  }

  return (
    <a onClick={handleClick} title={title} className="block lg:inline-block">
      <NavItemContainer active={active || clicked}>
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
    </a>
  )
}

const BottomNavBar = ({
  currentSectionIndex,
  currentPageIndex,
  onPageChange,
}) => {
  return (
    <nav
      className="fixed bottom-0"
      style={{
        width: "100%",
      }}
    >
      <FrostedGlass />
      <div
        style={{ zIndex: 0, background: "none", height: "4rem" }}
        className="flex-grow flex items-center w-auto flex-row justify-around"
      >
        <NavItem
          icon={faLaptopCode}
          title="intro"
          href={"#intro"}
          active={currentPageIndex === 0}
          onPress={() => {
            onPageChange(0)
          }}
        />
        <NavItem
          icon={faBriefcase}
          title="job"
          href={"#job"}
          active={currentPageIndex === 1}
          onPress={() => {
            onPageChange(1)
          }}
        />
        <NavItem
          icon={faHammer}
          title="skills"
          href={"#skills"}
          active={currentPageIndex === 2}
          onPress={() => {
            onPageChange(2)
          }}
        />
        <NavItem
          icon={faHeart}
          title="projects"
          href={"#projects"}
          active={currentPageIndex === 3}
          onPress={() => {
            onPageChange(3)
          }}
        />
        <NavItem
          icon={faShareAlt}
          title="socials"
          href={"#socials"}
          active={currentPageIndex === 4}
          onPress={() => {
            onPageChange(4)
          }}
        />
      </div>
    </nav>
  )
}

export default BottomNavBar
