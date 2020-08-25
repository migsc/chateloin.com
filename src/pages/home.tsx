import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useStaticQuery, graphql } from "gatsby"
import { faCode, faMusic } from "@fortawesome/pro-light-svg-icons"
import { faAlienMonster } from "@fortawesome/pro-regular-svg-icons"

import { colors } from "../constants.ts"
import SEO from "../components/SEO"
import Layout from "../components/Layout"
import NavButton from "../components/Home/NavButton"
import * as styles from "./home.module.css"

interface HomePageState {
  underConstruction: boolean
}

interface HomePageActions {}

const useContainer = (): [HomePageState, HomePageActions] => {
  const {
    site: {
      siteMetadata: { underConstruction },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            underConstruction
          }
        }
      }
    `
  )

  const actions = {}

  return [{ underConstruction }, actions]
}

const header = ["Hello."]
const headerUnderConstruction = ["under", <br />, "construction"]

const tagline = `I love making apps, music, and pixel art. Which area do you want to know more about?`
const taglineUnderConstruction = `I have a couple of different personas. `

const HomePage: React.FC = () => {
  const [{ underConstruction }] = useContainer()
  console.log("underConstruction", underConstruction)
  return (
    <Layout bodyClassName={styles.background} scrollable={false}>
      <div className={styles.stars}></div>
      <div className={styles.twinkling}></div>
      {/* <div className={styles.clouds}></div> */}
      <main className={`${styles.content} container mx-auto px-4 sm:px-6`}>
        <div className="max-w-xs py-12 md:py-48 md:max-w-sm lg:max-w-lg sm:mx-auto">
          <h1 className="text-6xl mb-8">
            {underConstruction ? headerUnderConstruction : header}
          </h1>
          <p className="text-2xl">
            {underConstruction ? taglineUnderConstruction : tagline}
            <FontAwesomeIcon icon="code" />
          </p>
          {!underConstruction && (
            <div className="flex flex-row justify-around mt-16 mx-auto">
              <NavButton
                style={{
                  borderColor: colors.Purple,
                  backgroundColor: "#1f183a",
                }}
                iconColor={colors.Purple}
                icon={faCode}
                linkTo="code"
              />
              <NavButton
                style={{
                  borderColor: colors.Peach,
                  backgroundColor: "#210c08",
                }}
                iconColor={colors.Peach}
                icon={faMusic}
              />
              <NavButton
                style={{
                  borderColor: colors.Green,
                  backgroundColor: "#08211c",
                }}
                iconColor={colors.Green}
                icon={faAlienMonster}
              />
            </div>
          )}
        </div>
      </main>
    </Layout>
  )
}

export default HomePage
