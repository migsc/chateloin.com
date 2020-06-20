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

interface NavButtonProps {
  icon: IconDefinition
  linkTo?: string
}

const NavButton: React.FC<NavButtonProps> = ({
  icon = faCode,
  linkTo = "#",
}) => (
  <Link to={linkTo}>
    <div className="border-white border-solid border-4 h-16 w-16 rounded-full flex justify-center">
      <FontAwesomeIcon
        className="self-center text-xl"
        icon={icon}
        color="#fff"
      />
    </div>
  </Link>
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

const HomePage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Miguel Chateloin" />
      <div className="max-w-xs py-12 md:py-48 md:max-w-sm lg:max-w-lg sm:mx-auto">
        <h1 className="text-4xl mb-4">
          miguel <br />
          chateloin
        </h1>
        <p className="text-xl">
          A pretty cool guy with a cool guy tagline that goes here.{" "}
          <FontAwesomeIcon icon="code" />
        </p>
        <div className="flex flex-row justify-around mt-32 mx-auto">
          <NavButton icon={faCode} linkTo="code" />
          <NavButton icon={faMusic} />
          <NavButton icon={faPaintBrush} />
        </div>
      </div>

      {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
  )
}

export default HomePage
