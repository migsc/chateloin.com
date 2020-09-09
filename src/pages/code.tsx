import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { queryCodeAvatarImage } from "../graphql"

import { faAngleUp } from "@fortawesome/pro-regular-svg-icons"
// import { faCode, faMusic } from "@fortawesome/pro-light-svg-icons"
import {
  faLaptopCode,
  faQuestion,
  faBriefcase,
  faHammer,
  faShareAlt,
} from "@fortawesome/pro-light-svg-icons"

import { useState, useEffect, useRef } from "react"
import { useHardSkillSearchResultsFiltered } from "../hooks"
import { useSpring, animated, config } from "react-spring"

import ReactLogoSVG from "../img/react-logo.svg"
import ReduxLogoSVG from "../img/redux-logo.svg"
import JSLogoSVG from "../img/js-logo.svg"
import TSLogoSVG from "../img/ts-logo.svg"
import NodeLogoSVG from "../img/node-logo.svg"

import PortalButton from "../components/PortalButton"
import ScrollSection from "../components/ScrollSection"
import { useViewportDimensions } from "../hooks"
import { HeadingText, BodyText } from "../components/text"
import { Nav } from "../components/Code/Nav"
import styled from "styled-components"
import { colors } from "../constants"

import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  useDisclosure,
  SlideIn,
} from "@chakra-ui/core"
import { Waypoint } from "react-waypoint"
import Img from "gatsby-image"
import SEO from "../components/SEO"
import jsonData from "../data.json"
import Layout from "../components/Layout"
import SkillsSection from "../components/Code/SkillsSection"
import { ExperienceSection } from "../components/Code"
import CircleImage from "../components/CircleImage"
import TextLink from "../components/TextLink"

import srcCodeAvatar from "../img/code-avatar.jpg"
import srcCenergisticLogo from "../img/cenergistic-logo.png"

import { TagMap } from "../types"
import * as styles from "./code.module.css"

const scrollToRef = ref =>
  window.scrollTo({ top: ref?.current?.offsetTop, behavior: "smooth" })

const useContainer = () => {
  const {
    pages: {
      code: { skills, experience, social },
    },
  } = jsonData

  const [searchText, setSearchText] = useState("")
  const [activeSkillTab, setActiveSkillTab] = useState("hard")
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  const [
    hardSkillSearchResults,
    { toggleActiveTag },
  ] = useHardSkillSearchResultsFiltered(skills.hard, searchText)

  const handlers = {
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value)
    },
    handleHardSkillTagClick: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      tagName: string
    ) => {
      toggleActiveTag(tagName)
    },
    handleSkillTabClick: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      tab: string
    ) => {
      setActiveSkillTab(tab)
    },
  }

  return {
    ...handlers,
    hardSkillSearchResults,
    softSkills: skills.soft,
    activeSkillTab,
    experience,
    social,
    sectionRefs,
  }
}

interface ContentProps {
  children?: any // TODO: Be more specific
  style?: any // TODO: Be more specific
  fadeIn?: boolean
}

const Content: React.FC<ContentProps> = ({ children, style, fadeIn = false }) =>
  fadeIn ? (
    <animated.div style={style} className="flex flex-col h-full justify-center">
      {children}
    </animated.div>
  ) : (
    <div style={style} className="flex flex-col h-full justify-center">
      {children}
    </div>
  )

export const query = graphql`
  query CodeAvatarImageQuery {
    file(relativePath: { eq: "src/img/code-avatar.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

const CodePage: React.FC = props => {
  console.log("codeAvatarImage", props)
  const {
    handleSearchChange,
    handleHardSkillTagClick,
    handleSkillTabClick,
    hardSkillSearchResults,
    softSkills,
    activeSkillTab,
    experience,
    social,
    sectionRefs,
  } = useContainer()

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const today = useRef(new Date())
  const { height: viewportHeight } = useViewportDimensions()

  const fadeInProps = useSpring({
    // config: config.default,
    opacity: 1,
    from: { opacity: 0 },
  })

  const handleUpdateCurrentSection = ({ index }) =>
    setCurrentSectionIndex(index)

  const handleScrollToNextSection = () => {
    if (currentSectionIndex < sectionRefs.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1)
      scrollToRef(sectionRefs[currentSectionIndex + 1])
    }
  }

  const handleScrollToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1)
      scrollToRef(sectionRefs[currentSectionIndex - 1])
    }
  }

  const handleOpenAllSkillsModal = () => {
    debugger
    setAllSkillsModalOpen(true)
  }

  const handleCloseAllSkillsModal = () => {
    setAllSkillsModalOpen(false)
  }

  return (
    <>
      <animated.div style={fadeInProps}>
        <Nav />
      </animated.div>
      <Layout className={styles.background}>
        <main className="container mx-auto px-4 sm:px-6">
          <SEO title="miguel chateloin / code" />

          <div className="md:max-w-lxg lg:max-w-2xl xl:max-w-2xl sm:mx-auto">
            <ScrollSection
              id="intro"
              index={0}
              onEnter={handleUpdateCurrentSection}
              height={viewportHeight}
            >
              <Content fadeIn style={fadeInProps}>
                <CircleImage src={srcCodeAvatar} />
                <HeadingText>I build tech.</HeadingText>
                <BodyText>
                  Mostly apps and websites. For fun. For a living. I'm best
                  described as a front-end software engineer.
                </BodyText>
              </Content>
            </ScrollSection>

            <ScrollSection
              id="job"
              index={1}
              onEnter={handleUpdateCurrentSection}
              height={viewportHeight}
              marginBottom={viewportHeight * 0.5}
            >
              <Content>
                <CircleImage src={srcCenergisticLogo} />
                <HeadingText>Currently,</HeadingText>
                <BodyText>
                  I work at a company in Dallas that helps schools save energy.
                  We build{" "}
                  <TextLink
                    newTab
                    href="https://cdn2.hubspot.net/hubfs/4433266/Website%20Documents/Ceres%20GreenX%20Product%20Brief.pdf?__hssc=106973277.1.1599597603546&__hstc=106973277.b239780adb9316d275282b120b47bf74.1599594171332.1599594171332.1599597603546.2&__hsfp=2190378817&hsCtaTracking=3c595979-b442-43a9-b0cd-5c0c172ae66d%7C0da106c4-8282-4fa4-841a-2231f4542f68"
                  >
                    a cross-platform app
                  </TextLink>{" "}
                  that helps manage huge utility costs across many facilities.
                </BodyText>
              </Content>
            </ScrollSection>

            <ScrollSection
              id="skills"
              index={2}
              onEnter={handleUpdateCurrentSection}
              height={viewportHeight}
              marginBottom={viewportHeight * 0.4}
            >
              <div
                className="flex flex-row justify-between mb-8"
                style={{ height: "3.125rem", alignItems: "center" }}
              >
                <ReactLogoSVG
                  style={{ opacity: 0.6 }}
                  width="3.125rem"
                  height="3.125rem"
                />
                <ReduxLogoSVG
                  style={{ opacity: 0.6 }}
                  width="3.125rem"
                  height="3.125rem"
                />
                <JSLogoSVG
                  style={{ opacity: 0.6 }}
                  width="3.125rem"
                  height="3.125rem"
                />
                <TSLogoSVG
                  style={{ opacity: 0.6 }}
                  width="3.125rem"
                  height="3.125rem"
                />
                <NodeLogoSVG
                  style={{ opacity: 0.6 }}
                  width="3.125rem"
                  height="3.125rem"
                />
              </div>
              <div>
                <HeadingText>Always learning,</HeadingText>
                <BodyText>
                  Always looking for the next best tool. Working in the industry
                  for {today.current.getFullYear() - 2012} years, I've had some
                  time to pick up a ton of languages, frameworks, etc.
                </BodyText>

                <Button onClick={onOpen}>Trigger modal</Button>
              </div>

              <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Modal Title</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    askdjf lsjasdhf lasjd dkjf adslkf jadslkfjadslfkjadsflksdjf
                  </ModalBody>
                  <ModalFooter>
                    <Button>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              {/* <SkillsSection
                activeSkillTab={activeSkillTab}
                hardSkillsFiltered={hardSkillSearchResults.skillsFiltered}
                hardSkillTagsFiltered={hardSkillSearchResults.tagsFiltered}
                softSkills={softSkills}
                onTabClick={handleSkillTabClick}
                onSearchChange={handleSearchChange}
                onHardSkillTagClick={handleHardSkillTagClick}
              /> */}
            </ScrollSection>

            <ScrollSection
              id="socials"
              index={3}
              onEnter={handleUpdateCurrentSection}
              height={viewportHeight}
            >
              <Content>
                <HeadingText>Need hel</HeadingText>
                <BodyText>as dfadsf sadf sdf</BodyText>
              </Content>
              <PortalButton
                primaryColor={"#fff"}
                secondaryColor={colors.Cream}
                icon={faAngleUp}
                onClick={handleScrollToNextSection}
              />
            </ScrollSection>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default CodePage
