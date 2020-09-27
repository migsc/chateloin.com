import React from "react"
import { Link } from "gatsby"
const Branding = () => (
  <div className="flex items-center flex-shrink-0 color-white mr-6">
    <Link to="/">
      <span className="text-xl tracking-tight">miguel chateloin</span>
    </Link>
  </div>
)

const HeaderBar = () => (
  <nav
    className="sticky top-0 items-center justify-between flex flex-row flex-wrap p-4 border-white"
    style={{
      position: "fixed",
      width: "100%",
      borderBottomWidth: `${1 / 64}rem`,
    }}
  >
    <Branding />
    <div className="block flex-grow lg:flex lg:items-center lg:w-auto flex flex-row justify-between">
      <div className="text-sm lg:flex-grow flex flex-row justify-around"></div>
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

export default HeaderBar
