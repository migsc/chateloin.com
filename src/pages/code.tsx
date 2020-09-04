import React, { useState, useEffect, useRef } from "react"
import { Waypoint } from "react-waypoint"
import { useSpring, animated, config } from "react-spring"
import { faAngleDown } from "@fortawesome/pro-regular-svg-icons"

import SEO from "../components/SEO"
import jsonData from "../data.json"
import Layout from "../components/Layout"
import SkillsSection from "../components/Code/SkillsSection"
import { ExperienceSection } from "../components/Code"
import { TagMap } from "../types"
import * as styles from "./code.module.css"
import { useHardSkillSearchResultsFiltered } from "../hooks"
import HomePage from "./home"
import PortalButton from "../components/PortalButton"
import ScrollSection from "../components/ScrollSection"
import { useViewportDimensions } from "../hooks"
import { HeadingText, BodyText } from "../components/text"
import { Nav } from "../components/Code/Nav"
import styled from "styled-components"
import { colors } from "../constants"

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

const Content = ({ children, style, fadeIn = false }) =>
  fadeIn ? (
    <animated.div style={style} className="flex flex-col h-full justify-center">
      {children}
    </animated.div>
  ) : (
    <div style={style} className="flex flex-col h-full justify-center">
      {children}
    </div>
  )

const CodePage: React.FC = () => {
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
  const today = useRef(new Date())

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
            >
              <Content fadeIn style={fadeInProps}>
                <BodyText>icon-code</BodyText>
                <HeadingText>I build tech.</HeadingText>
                <BodyText>
                  Mostly apps and websites. For fun. For a living. I'm best
                  described as a front-end software engineer.
                </BodyText>
                <PortalButton
                  primaryColor={"#fff"}
                  secondaryColor={colors.Cream}
                  icon={faAngleDown}
                  onClick={handleScrollToNextSection}
                />
              </Content>
            </ScrollSection>

            <ScrollSection
              id="job"
              index={1}
              onEnter={handleUpdateCurrentSection}
            >
              <Content>
                <BodyText>greenx-leaf.jpg</BodyText>
                <HeadingText>Currently,</HeadingText>
                <BodyText>
                  I work at
                  <a href="https://greenx.cenergistic.com/"> a company</a> in
                  Dallas that helps schools save energy. I developed a mobile
                  app that helps manage the utility cost data across facilities.
                </BodyText>
                <PortalButton
                  primaryColor={"#fff"}
                  secondaryColor={colors.Cream}
                  icon={faAngleDown}
                  onClick={handleScrollToNextSection}
                />
              </Content>
            </ScrollSection>

            <ScrollSection
              id="skills"
              index={2}
              onEnter={handleUpdateCurrentSection}
            >
              <HeadingText>Always learning,</HeadingText>
              <BodyText>
                Always looking for the next best tool. Working in the industry
                for {today.current.getFullYear() - 2012} years, I've had some
                time to pick up a ton of languages, frameworks, etc.
              </BodyText>
              <SkillsSection
                activeSkillTab={activeSkillTab}
                hardSkillsFiltered={hardSkillSearchResults.skillsFiltered}
                hardSkillTagsFiltered={hardSkillSearchResults.tagsFiltered}
                softSkills={softSkills}
                onTabClick={handleSkillTabClick}
                onSearchChange={handleSearchChange}
                onHardSkillTagClick={handleHardSkillTagClick}
              />
              <PortalButton
                primaryColor={"#fff"}
                secondaryColor={colors.Cream}
                icon={faAngleDown}
                onClick={handleScrollToNextSection}
              />
            </ScrollSection>

            <ScrollSection
              id="socials"
              index={3}
              onEnter={handleUpdateCurrentSection}
            >
              <Content>
                <HeadingText>Need hel</HeadingText>
                <BodyText>as dfadsf sadf sdf</BodyText>
              </Content>
              <PortalButton
                primaryColor={"#fff"}
                secondaryColor={colors.Cream}
                icon={faAngleDown}
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
