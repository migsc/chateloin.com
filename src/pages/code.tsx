import React, { useState, useEffect } from "react"
import SEO from "../components/SEO"
import jsonData from "../data.json"
import Layout from "../components/Layout"
import SkillsSection from "../components/Code/SkillsSection"
import { ExperienceSection } from "../components/Code"
import { TagMap } from "../types"
import * as styles from "./code.module.css"
import { useHardSkillSearchResultsFiltered } from "../hooks"
import HomePage from "./home"

const useContainer = () => {
  const {
    pages: {
      code: { skills, experience, social },
    },
  } = jsonData

  const [searchText, setSearchText] = useState("")
  const [activeSkillTab, setActiveSkillTab] = useState("hard")

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
  } = useContainer()
  return (
    <Layout className={styles.background}>
      <SEO title="miguel chateloin / code" />
      <div className="max-w-xs py-12 md:py-48 md:max-w-sm lg:max-w-lg sm:mx-auto">
        <div>
          <h1 className="text-4xl mb-4">
            miguel <br />
            chateloin
          </h1>
          <p className="text-xl">
            A cool "Coding" page tagline would go here. This is like the
            "Objective" section of a resume.
          </p>
        </div>
        <SkillsSection
          activeSkillTab={activeSkillTab}
          hardSkillsFiltered={hardSkillSearchResults.skillsFiltered}
          hardSkillTagsFiltered={hardSkillSearchResults.tagsFiltered}
          softSkills={softSkills}
          onTabClick={handleSkillTabClick}
          onSearchChange={handleSearchChange}
          onHardSkillTagClick={handleHardSkillTagClick}
        />
        <ExperienceSection {...experience} />
        <div className="mt-16 mb-16">
          <h2 className="mb-8">connect</h2>
          <div>{JSON.stringify(social)}</div>
        </div>
      </div>
    </Layout>
  )
}

export default CodePage
