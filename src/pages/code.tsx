import React, { useState, useEffect, useRef } from "react"
import SEO from "../components/SEO"
import jsonData from "../data.json"
import Layout from "../components/Layout"
import SkillsSection from "../components/Code/SkillsSection"
import { ExperienceSection } from "../components/Code"
import { TagMap } from "../types"
import * as styles from "./code.module.css"
import { useHardSkillSearchResultsFiltered } from "../hooks"
import HomePage from "./home"
import NavButton from "../components/Home/NavButton"

const scrollToRef = ref =>
  window.scrollTo({ top: ref.current.offsetTop - 32, behavior: "smooth" })

const useContainer = () => {
  const {
    pages: {
      code: { skills, experience, social },
    },
  } = jsonData

  const [searchText, setSearchText] = useState("")
  const [activeSkillTab, setActiveSkillTab] = useState("hard")
  const sectionOneRef = useRef(null)
  const sectionTwoRef = useRef(null)
  const sectionThreeRef = useRef(null)
  const sectionFourRef = useRef(null)

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
    sectionOneRef,
    sectionTwoRef,
    sectionThreeRef,
    sectionFourRef,
  }
}

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
    sectionOneRef,
    sectionTwoRef,
    sectionThreeRef,
    sectionFourRef,
  } = useContainer()

  return (
    <Layout className={styles.background}>
      <SEO title="miguel chateloin / code" />
      <div className="py-12 md:py-48 md:max-w-lxg lg:max-w-2xl xl:max-w-2xl sm:mx-auto">
        <div>
          <section ref={sectionOneRef} className={`${styles.scrollArea} one`}>
            <h1 className="text-4xl mb-4">
              my name is miguel chateloin and I solve problems for fun (and a
              living).
            </h1>
            <p className="text-xl"></p>
            <NavButton
              onClick={() => {
                scrollToRef(sectionTwoRef)
              }}
            />
          </section>

          <section ref={sectionTwoRef} className={`${styles.scrollArea} two`}>
            <h1>Current</h1>
            <NavButton onClick={() => scrollToRef(sectionThreeRef)} />
          </section>

          <section
            ref={sectionThreeRef}
            className={`${styles.scrollArea} three`}
          >
            <SkillsSection
              activeSkillTab={activeSkillTab}
              hardSkillsFiltered={hardSkillSearchResults.skillsFiltered}
              hardSkillTagsFiltered={hardSkillSearchResults.tagsFiltered}
              softSkills={softSkills}
              onTabClick={handleSkillTabClick}
              onSearchChange={handleSearchChange}
              onHardSkillTagClick={handleHardSkillTagClick}
            />
            <NavButton onClick={() => scrollToRef(sectionFourRef)} />
          </section>

          <section ref={sectionFourRef} className={`${styles.scrollArea} four`}>
            <h1>Links</h1>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default CodePage
