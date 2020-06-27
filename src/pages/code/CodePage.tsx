import React, { useState, useEffect } from "react"
import SEO from "../../components/seo"
import pageData from "../../data/code-page.json"
import Layout from "../../components/Layout"
import SkillsSection from "./SkillsSection"
import { TagMap } from "../../types"
import styles from "./CodePage.module.css"
import { getTagMapFromTagNames } from "../../utils"
//skills.hard

interface TagMapActions {
  toggleActiveTag: (tagName: string) => void
}

type TagMapState = TagMap

const useTagMap = (tags: string[]): [TagMapState, TagMapActions] => {
  const [state, setState]: [
    TagMapState,
    React.Dispatch<React.SetStateAction<TagMap>>
  ] = useState<TagMapState>({})

  useEffect(() => {
    setState(getTagMapFromTagNames(tags))
  }, [])

  const actions = {
    toggleActiveTag: (tagName: string): void => {
      setState({
        ...state,
        [tagName]: {
          ...state[tagName],
          active: !state[tagName].active,
        },
      })
    },
  }

  return [state, actions]
}

const CodePage: React.FC = () => {
  const { skills, experience, social } = pageData

  const [searchText, setSearchText] = useState("")
  const [tagsByName, { toggleActiveTag }] = useTagMap(
    skills.hard.map(({ tags: tagNames }) => tagNames).flat()
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const handleHardSkillTagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tagName: string
  ) => {
    toggleActiveTag(tagName)
  }

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
          skills={skills}
          hardSkillTagsByName={tagsByName}
          searchText={searchText}
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
