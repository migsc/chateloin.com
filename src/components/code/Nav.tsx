import React from "react"
import { Link } from "gatsby"
import {
  faLaptopCode,
  faQuestion,
  faBriefcase,
  faHammer,
  faShareAlt,
} from "@fortawesome/pro-light-svg-icons"
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
      to={`${base}${href}`}
      className="block mt-4 lg:inline-block lg:mt-0 mr-4"
      // style={{ fontWeight: 100 }}
    >
      <span style={{ color: "white" }}>
        <FontAwesomeIcon className="mr-1" icon={icon} color={"white"} />
        {title}
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
  <div className="flex items-center flex-shrink-0 color-white mr-6">
    <Link to="/">
      <span className="text-xl tracking-tight">miguel chateloin</span>
    </Link>
  </div>
)

export const Nav = () => (
  <nav
    className="sticky top-0 items-center justify-between flex flex-row flex-wrap p-4 bg-indigo-400"
    style={{ position: "fixed", width: "100%" }}
  >
    <Branding />
    {/* <Hamburger /> */}
    <div className="block flex-grow lg:flex lg:items-center lg:w-auto flex flex-row justify-between">
      <div className="text-sm lg:flex-grow flex flex-row justify-around">
        <NavItem
          icon={faLaptopCode}
          base={"/code"}
          title="intro"
          href={"#intro"}
        />
        <NavItem icon={faBriefcase} base={"/code"} title="job" href={"#job"} />
        <NavItem
          icon={faHammer}
          base={"/code"}
          title="skills"
          href={"#skills"}
        />
        <NavItem
          icon={faShareAlt}
          base={"/code"}
          title="socials"
          href={"#socials"}
        />
      </div>
      <div>
        <a
          href="#"
          className="inline-block text-sm px-4 py-2 leading-none border rounded color-white hover:border-transparent  hover:text-white hover:bg-indigo-600 mt-4 lg:mt-0"
        >
          contact
        </a>
      </div>
    </div>
  </nav>
)
