import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useStaticQuery, graphql } from "gatsby"
import {
  faCode,
  faMusic,
  faPaintBrush,
} from "@fortawesome/free-solid-svg-icons"
import SEO from "../../components/seo"
import Layout from "../../components/Layout"
import NavButton from "./NavButton"
import styles from "./HomePage.module.css"

interface HomePageState {
  underConstruction: boolean
}

interface HomePageActions {}

const useContainer = (): [HomePageState, HomePageActions] => {
  const {
    site: { underConstruction },
  } = useStaticQuery(
    graphql`
      query {
        site {
          underConstruction
        }
      }
    `
  )

  const actions = {}

  return [{ underConstruction }, actions]
}

const header = ["miguel", <br />, "chateloin"]
const headerUnderConstruction = ["under", <br />, "construction"]

const tagline = `A pretty cool guy with a cool guy tagline that goes here. 
Maybe it can go up to here? This is a nice length.`
const taglineUnderConstruction = `I'm done messing around with WordPress 
templates. I'm taking some time right now to build something from scratch using 
the tools I love. Check back soon!`

const HomePage: React.FC = () => {
  const [{ underConstruction }] = useContainer()
  console.log("underConstruction", underConstruction)
  return (
    <Layout bodyClassName={styles.background} scrollable={false}>
      <SEO title="Miguel Chateloin" />
      <div className="max-w-xs py-12 md:py-48 md:max-w-sm lg:max-w-lg sm:mx-auto">
        <h1 className="text-4xl mb-4">
          {underConstruction ? headerUnderConstruction : header}
        </h1>
        <p className="text-xl">
          {underConstruction ? taglineUnderConstruction : tagline}
          <FontAwesomeIcon icon="code" />
        </p>
        {!underConstruction && (
          <div className="flex flex-row justify-around mt-32 mx-auto">
            <NavButton icon={faCode} linkTo="code" />
            <NavButton icon={faMusic} />
            <NavButton icon={faPaintBrush} />
          </div>
        )}
      </div>

      {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
  )
}

export default HomePage
