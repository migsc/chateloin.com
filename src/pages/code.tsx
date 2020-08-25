import React, { useState, useEffect, useRef } from "react"
import { Waypoint } from "react-waypoint"
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

const getViewportWidth = () =>
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
const getViewportHeight = () =>
  Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

const useViewportDimensions = () => {
  const [width, setWidth] = useState(getViewportWidth())
  const [height, setHeight] = useState(getViewportHeight())

  const handleResize = () => {
    setWidth(getViewportWidth())
    setHeight(getViewportHeight())
    console.log(`width=${getViewportWidth()}\theight=${getViewportHeight()}`)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return { width, height }
}

const scrollToRef = ref =>
  window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" })

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

const ScrollSection = ({
  index,
  children,
  refThis,
  refNext,
  onEnter = props => {},
  onNext = () => {},
}) => {
  const { height: viewportHeight } = useViewportDimensions()

  const handleScrollInto = () => {
    onEnter({ ref: refThis, index })
  }

  return (
    <section
      style={{ height: viewportHeight }}
      ref={refThis}
      className={`${styles.scrollArea} one`}
    >
      <Waypoint onEnter={handleScrollInto} />
      {children}
      {refNext && <NavButton onClick={onNext} />}
    </section>
  )
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
    sectionRefs,
  } = useContainer()

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

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
      <nav className="sticky top-0 flex items-center justify-between flex-wrap bg-white p-6">
        <div className="flex items-center flex-shrink-0 text-indigo-700 mr-6">
          <span className="font-semibold text-xl tracking-tight">
            miguel chateloin
          </span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-indigo-600 border-indigo-300 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-indigo-600 hover:text-white mr-4"
            >
              current
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-indigo-600 hover:text-white mr-4"
            >
              skills
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-indigo-600 hover:text-white"
            >
              links
            </a>
          </div>
          <div>
            <a
              href="#"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Action
            </a>
          </div>
        </div>
      </nav>
      <Layout className={styles.background}>
        <main className="container mx-auto px-4 sm:px-6">
          <SEO title="miguel chateloin / code" />

          <div className="md:max-w-lxg lg:max-w-2xl xl:max-w-2xl sm:mx-auto">
            <ScrollSection
              index={0}
              refThis={sectionRefs[0]}
              refNext={sectionRefs[1]}
              onEnter={handleUpdateCurrentSection}
              onNext={handleScrollToNextSection}
            >
              <h1 className="text-4xl mb-4 ">
                I solve problems for fun (and a living).
              </h1>
            </ScrollSection>

            <ScrollSection
              index={1}
              refThis={sectionRefs[1]}
              refNext={sectionRefs[2]}
              onEnter={handleUpdateCurrentSection}
              onNext={handleScrollToNextSection}
            >
              <h1>Current</h1>
            </ScrollSection>

            <ScrollSection
              index={2}
              refThis={sectionRefs[2]}
              refNext={sectionRefs[3]}
              onEnter={handleUpdateCurrentSection}
              onNext={handleScrollToNextSection}
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
            </ScrollSection>

            <ScrollSection
              index={3}
              refThis={sectionRefs[3]}
              onEnter={handleUpdateCurrentSection}
              onNext={handleScrollToNextSection}
            >
              <h1>Links</h1>
            </ScrollSection>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default CodePage
