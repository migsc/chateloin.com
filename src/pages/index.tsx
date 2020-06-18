import React from "react"
import { Link } from "gatsby"
import "../components/global.css"
import Image from "../components/image"
import SEO from "../components/seo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet } from "react-helmet"
import {
  faCode,
  faMusic,
  faPaintBrush,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons"
import Layout from "../components/layout"

interface MenuItemProps {
  icon: IconDefinition
}

const MenuItem: React.FC<MenuItemProps> = ({ icon = faCode }) => (
  <div className="bg-gray-200 h-16 w-16 rounded-full flex justify-center">
    <FontAwesomeIcon className="self-center" icon={icon} color="#000" />
  </div>
)

/*

small
  640
medium
  768
large
  1024
extra large
  1280

*/

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Miguel Chateloin" />
      <Helmet bodyAttributes={{ class: "bg-green-500" }} />
      <div className="container mx-auto">
        <h1>miguel chateloin</h1>
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
    </Layout>
  )
}

export default IndexPage
