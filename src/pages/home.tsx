import React from "react"
import { useSpring, animated } from "react-spring"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode, faMusic } from "@fortawesome/pro-light-svg-icons"
import { faAlienMonster } from "@fortawesome/pro-regular-svg-icons"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import { colors } from "../constants.ts"
import SEO from "../components/SEO"
import Layout from "../components/Layout"
import IconButton from "../components/IconButton"
import * as styles from "./home.module.css"
import { HeadingText, BodyText } from "../components/text"

interface HomePageState {
  fadeInProps: any
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

  // const fadeInProps = useSpring({ opacity: 1, from: { opacity: 0 } })
  const fadeInProps = {}

  const actions = {}

  return [{ fadeInProps }, actions]
}

const StyledBackgroundElement = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
`

const BackgroundAnimation = () => {
  return (
    <>
      <StyledBackgroundElement className={styles.stars} />
      <StyledBackgroundElement className={styles.twinkling} />
      {/* <StyledBackgroundElement className={styles.clouds} /> */}
    </>
  )
}

const HomePage: React.FC = () => {
  const [{ fadeInProps }] = useContainer()
  return (
    <Layout bodyClassName={styles.background} scrollable={false}>
      <BackgroundAnimation />
      <main
        className={`${styles.content} container mx-auto px-4 sm:px-6 transition-all`}
      >
        <animated.div
          style={fadeInProps}
          className="max-w-xs py-12 md:py-48 md:max-w-sm lg:max-w-lg sm:mx-auto"
        >
          <HeadingText>Hello.</HeadingText>
          <BodyText>
            I love making apps, music, and pixel art. What area do you want to
            know more about?
          </BodyText>
          <div className="flex flex-row justify-around mt-16 mx-auto">
            <IconButton
              primaryColor={"#1f183a"}
              secondaryColor={colors.Purple}
              icon={faCode}
              linkTo="/code/"
            />
            <IconButton
              primaryColor={"#210c08"}
              secondaryColor={colors.Peach}
              icon={faMusic}
            />
            <IconButton
              primaryColor={"#08211c"}
              secondaryColor={colors.Green}
              icon={faAlienMonster}
            />
          </div>
        </animated.div>
      </main>
    </Layout>
  )
}

export default HomePage
