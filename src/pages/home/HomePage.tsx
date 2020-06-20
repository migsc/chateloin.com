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
import NavButton from "./NavButton"

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
          A pretty cool guy with a cool guy tagline that goes here. Maybe it can
          go up to here? This is a nice length.
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
