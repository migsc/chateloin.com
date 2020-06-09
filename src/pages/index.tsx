import React from "react"
import { Link } from "gatsby"
import "../components/global.css"
import Image from "../components/image"
import SEO from "../components/seo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCode,
  faMusic,
  faPaintBrush,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons"

interface MenuItemProps {
  icon: IconDefinition
}

const MenuItem: React.FC<MenuItemProps> = ({ icon = faCode }) => (
  <div className="bg-gray-200 h-16 w-16 rounded-full flex justify-center">
    <FontAwesomeIcon className="self-center" icon={icon} />
  </div>
)

const IndexPage: React.FC = () => (
  <>
    <SEO title="Miguel Chateloin" />
    <div className="container mx-auto">
      <h1>Miguel Chateloin</h1>
      <p>
        A pretty cool guy with a cool guy tagline that goes here.{" "}
        <FontAwesomeIcon icon="code" />
      </p>
      <div className="flex flex-row justify-between">
        <MenuItem icon={faCode} />
        <MenuItem icon={faMusic} />
        <MenuItem icon={faPaintBrush} />
      </div>
    </div>

    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </>
)

export default IndexPage
