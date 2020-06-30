import React, { useState, useEffect } from "react"
import SEO from "../../components/seo"
import jsonData from "../../data.json"
import Layout from "../../components/Layout"
import SkillsSection from "./SkillsSection"
import { TagMap } from "../../types"
import styles from "./CodePage.module.css"
import { useHardSkillSearchResultsFiltered } from "../../hooks"
//skills.hard

const useContainer = () => {
  const {
    pages: {
      code: { skills, experience, social },
    },
  } = jsonData

  const [searchText, setSearchText] = useState("")

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
  }

  return {
    ...handlers,
    hardSkillSearchResults,
    experience,
    social,
  }
}

const CodePage: React.FC = () => {
  const {
    handleSearchChange,
    handleHardSkillTagClick,
    hardSkillSearchResults,
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
          hardSkillsFiltered={hardSkillSearchResults.skillsFiltered}
          hardSkillTagsFiltered={hardSkillSearchResults.tagsFiltered}
          onSearchChange={handleSearchChange}
          onHardSkillTagClick={handleHardSkillTagClick}
        />

        <div className="mt-16 mb-16">
          <h2 className="mb-8">experience</h2>
          <div>
            <pre>{JSON.stringify(experience)}</pre>
          </div>
        </div>
        <div className="mt-16 mb-16">
          <h2 className="mb-8">connect</h2>
          <div>{JSON.stringify(social)}</div>
        </div>
      </div>
    </Layout>
  )
}

export default CodePage
