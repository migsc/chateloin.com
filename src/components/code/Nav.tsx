import React from "react"
import {
  faLaptopCode,
  faQuestion,
  faBriefcase,
  faHammer,
  faShareAlt,
} from "@fortawesome/pro-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnchorLink } from "gatsby-plugin-anchor-links"

import { Children } from "../../types"

interface NavItemProps {
  title: string
  icon: any // TODO specific type
  base: string
  href: string
  children: Children
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
      to={`${base}${href}`}
      className="block mt-4 lg:inline-block lg:mt-0 mr-4"
      style={{ color: "#764ba2" }}
    >
      <span style={{ color: "#764ba2" }}>
        <FontAwesomeIcon className="mr-1" icon={icon} color={"#764ba2"} />
        {children}
      </span>
    </AnchorLink>
  )
}

const Hamburger = () => (
  <div className="block lg:hidden">
    <button className="flex items-center px-3 py-2 border rounded text-indigo-600 border-indigo-300 hover:text-white hover:border-white">
      <svg
        className="fill-current h-3 w-3"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
      </svg>
    </button>
  </div>
)

const Branding = () => (
  <div className="flex items-center flex-shrink-0 text-indigo-700 mr-6">
    <span className="text-xl tracking-tight">miguel chateloin</span>
  </div>
)

export const Nav = () => (
  <nav className="sticky top-0 flex items-center justify-between flex-wrap bg-white p-4">
    <Branding />
    {/* <Hamburger /> */}
    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto flex-row justify-between">
      <div className="text-sm lg:flex-grow">
        <NavItem icon={faLaptopCode} base={"/code"} href={"#intro"}>
          intro
        </NavItem>
        <NavItem icon={faBriefcase} base={"/code"} href={"#job"}>
          job
        </NavItem>
        <NavItem icon={faHammer} base={"/code"} href={"#skills"}>
          skills
        </NavItem>
        <NavItem icon={faShareAlt} base={"/code"} href={"#socials"}>
          socials
        </NavItem>
      </div>
      <div>
        <a
          href="#"
          className="inline-block text-sm px-4 py-2 leading-none border rounded border-indigo-500 hover:border-transparent text-indigo-500 hover:text-white hover:bg-indigo-600 mt-4 lg:mt-0"
        >
          contact
        </a>
      </div>
    </div>
  </nav>
)
