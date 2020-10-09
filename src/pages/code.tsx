import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { debounce } from "lodash"
import PageScroller from "react-page-scroller"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import IconButton from "../components/IconButton"
import ChevronLinkContainer from "../components/ChevronLinkContainer"

import { faAngleUp, faCircle } from "@fortawesome/pro-regular-svg-icons"
// import { faCode, faMusic } from "@fortawesome/pro-light-svg-icons"
import {
  faLaptopCode,
  faQuestion,
  faBriefcase,
  faHammer,
  faShareAlt,
  faBrowser,
  faChevronRight,
  faChevronLeft,
  faSortSizeDown,
  faListMusic,
  faHexagon,
  faCalendarAlt,
  faCalendarEdit,
  faInfinity,
  faMusicSlash,
  faNotEqual,
  faShoppingCart,
} from "@fortawesome/pro-light-svg-icons"
import { faFileUser } from "@fortawesome/pro-regular-svg-icons"
import {
  faGithub,
  faGithubSquare,
  faSpotify,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"

import { useState, useEffect, useRef } from "react"
import { useHardSkillSearchResultsFiltered } from "../hooks"
import { useSpring, animated, config } from "react-spring"
import Slider from "react-slick"

import ReactLogoSVG from "../img/react-logo.svg"
import ReduxLogoSVG from "../img/redux-logo.svg"
import JSLogoSVG from "../img/js-logo.svg"
import TSLogoSVG from "../img/ts-logo.svg"
import NodeLogoSVG from "../img/node-logo.svg"

import Button from "../components/Button"
import PortalButton from "../components/PortalButton"
import ScrollSection from "../components/ScrollSection"
import { HeadingText, BodyText } from "../components/text"
import HeaderBar from "../components/Code/HeaderBar"
import BottomNavBar from "../components/Code/BottomNavBar"
import ContactModal from "../components/ContactModal"
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
  // Button,
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
import SlideItem from "../components/SlideItem"

import { useFadeInRenderProps } from "../hooks"
import srcCodeAvatar from "../img/code-avatar.jpg"
import srcCenergisticLogo from "../img/cenergistic-logo.png"

import { TagMap } from "../types"
import * as styles from "./code.module.css"

import { faImage } from "@fortawesome/free-regular-svg-icons"

const projectIcons = {
  "sort-size-down": faSortSizeDown,
  "list-music": faListMusic,
  hexagon: faHexagon,
  question: faQuestion,
  "calendar-alt": faCalendarAlt,
  "not-equal": faNotEqual,
  "shopping-cart": faShoppingCart,
  "calendar-edit": faCalendarEdit,
  spotify: faSpotify,
  image: faImage,
  infinity: faInfinity,
}

const SkillImage = styled.div`
  opacity: 0.6;
  transition: 0.4s;
  white-space: nowrap;

  & svg {
    /* width: 3.125rem;
    height: 3.125rem; */
    transition: 0.4s;
  }

  & p {
    text-align: center;
    visibility: hidden;
  }

  &:hover {
    opacity: 1;
    width: 3.5rem;
    height: 3.5rem;
  }

  &:hover svg {
    width: 3.5rem;
    height: 3.5rem;
  }

  &:hover p {
    visibility: visible;
  }
`

const SlickArrow = styled.div`
  font-size: 1rem;
  &:before {
    content: none;
  }
  & svg {
    width: 1rem;
  }
`

const SlickDot = styled.div`
  opacity: 0.5;
  transition: 0.3s;
  &.slick-active {
    opacity: 1;
  }
`

function NextArrow(props) {
  const { className, style, onClick } = props
  return (
    <SlickArrow className={className} onClick={onClick}>
      <FontAwesomeIcon icon={faChevronRight} color="white" />
    </SlickArrow>
  )
}

function PrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <SlickArrow className={className} onClick={onClick}>
      <FontAwesomeIcon icon={faChevronLeft} color="white" />
    </SlickArrow>
  )
}

function Dot(props) {
  const { className, style, onClick } = props
  return (
    <SlickDot className={className} onClick={onClick}>
      <FontAwesomeIcon icon={faCircle} />
    </SlickDot>
  )
}

const scrollToRef = ref => {
  window.scrollTo({ top: ref?.current?.offsetTop, behavior: "smooth" })
}

// const useContainer = () => {
//   const {
//     pages: {
//       code: { skills, experience, projects, social },
//     },
//   } = jsonData

//   const [searchText, setSearchText] = useState("")
//   const [activeSkillTab, setActiveSkillTab] = useState("hard")
//   const sectionRefs = [
//     useRef(null),
//     useRef(null),
//     useRef(null),
//     useRef(null),
//     useRef(null),
//     useRef(null),
//   ]

//   const [
//     hardSkillSearchResults,
//     { toggleActiveTag },
//   ] = useHardSkillSearchResultsFiltered(skills.hard, searchText)

//   const handlers = {
//     handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => {
//       setSearchText(e.target.value)
//     },
//     handleHardSkillTagClick: (
//       e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//       tagName: string
//     ) => {
//       toggleActiveTag(tagName)
//     },
//     handleSkillTabClick: (
//       e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//       tab: string
//     ) => {
//       setActiveSkillTab(tab)
//     },
//   }

//   return {
//     ...handlers,
//     hardSkillSearchResults,
//     softSkills: skills.soft,
//     activeSkillTab,
//     experience,
//     social,
//     sectionRefs,
//     projects,
//   }
// }

interface ContentProps {
  children?: any // TODO: Be more specific
  style?: any // TODO: Be more specific
  fadeIn?: boolean
}

const classNamesBordered = "border-dashed border-2 border-aqua"

const Content: React.FC<ContentProps> = ({
  children,
  style,
  fadeIn = false,
}) => (
  <div
    style={{ ...style }}
    className={`${classNamesBordered} pt-24 max-w-2xl h-screen mx-auto md:h-screen md:pt-0 md:flex md:flex-col md:justify-center`}
  >
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
  // const {
  //   handleSearchChange,
  //   handleHardSkillTagClick,
  //   handleSkillTabClick,
  //   hardSkillSearchResults,
  //   softSkills,
  //   activeSkillTab,
  //   experience,
  //   social,
  //   sectionRefs,
  // } = useContainer()
  const {
    pages: {
      code: { projects },
    },
  } = jsonData

  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]
  const [currentPage, setCurrentPage] = useState(null)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const today = useRef(new Date())

  const fadeInProps = useFadeInRenderProps()

  const handleUpdateCurrentSection = ({ index }) =>
    isMounted && setCurrentSectionIndex(index)

  const handlePageChange = num => {
    setCurrentPage(num) // set currentPage number, to reset it from the previous selected.
  }

  // const handleScrollToNextSection = () => {
  //   if (currentSectionIndex < sectionRefs.length - 1) {
  //     setCurrentSectionIndex(currentSectionIndex + 1)
  //     scrollToRef(sectionRefs[currentSectionIndex + 1])
  //   }
  // }

  // const handleScrollToPreviousSection = () => {
  //   if (currentSectionIndex > 0) {
  //     setCurrentSectionIndex(currentSectionIndex - 1)
  //     scrollToRef(sectionRefs[currentSectionIndex - 1])
  //   }
  // }

  // const handleScrollWheel = ({ deltaY }) => {
  //   if (deltaY < 0) {
  //     console.log("scrolling up")
  //     handleScrollToPreviousSection()
  //   } else if (deltaY > 0) {
  //     console.log("scrolling down")
  //     handleScrollToNextSection()
  //   }
  // }

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
    // const throttledScrollWheelHandler = debounce(handleScrollWheel, 1000, {
    //   leading: true,
    //   trailing: false,
    // })
    // window.addEventListener("wheel", throttledScrollWheelHandler)
    // return () =>
    //   window.removeEventListener("wheel", throttledScrollWheelHandler)
  }, [])

  return (
    <>
      <Layout className={styles.background} showFooter={false}>
        <HeaderBar />
        {/* <main className="container mx-auto px-4 sm:px-6"> */}
        <SEO title="miguel chateloin / code" />

        {/* <div className="md:max-w-lxg lg:max-w-2xl xl:max-w-2xl sm:mx-auto"> */}
        <PageScroller
          pageOnChange={handlePageChange}
          customPageNumber={currentPage}
        >
          {/* height={viewportHeight * 0.9} */}
          <Content fadeIn style={fadeInProps}>
            {/* <CircleImage src={srcCodeAvatar} /> */}
            <div className="px-4">
              <HeadingText>I build tech.</HeadingText>
              <BodyText>
                Mostly apps and websites. For fun. For a living. I'm best
                described as a front-end software engineer.
              </BodyText>
            </div>
          </Content>

          {/* <div ref={sectionRefs[0]} /> */}

          {/* marginBottom={viewportHeight * 0.5} */}

          <Content>
            <div className="px-4">
              <CircleImage src={srcCenergisticLogo} />
              <HeadingText>Currently,</HeadingText>
              <BodyText>
                I work at a company in Dallas that helps schools save energy. We
                build{" "}
                <TextLink
                  newTab
                  href="https://cdn2.hubspot.net/hubfs/4433266/Website%20Documents/Ceres%20GreenX%20Product%20Brief.pdf?__hssc=106973277.1.1599597603546&__hstc=106973277.b239780adb9316d275282b120b47bf74.1599594171332.1599594171332.1599597603546.2&__hsfp=2190378817&hsCtaTracking=3c595979-b442-43a9-b0cd-5c0c172ae66d%7C0da106c4-8282-4fa4-841a-2231f4542f68"
                >
                  a cross-platform app
                </TextLink>{" "}
                that helps our clients visualize huge utility costs across many
                facilities.
              </BodyText>
            </div>
          </Content>
          {/* <div ref={sectionRefs[1]} /> */}

          {/* height={viewportHeight} */}
          <Content>
            <div className="px-4">
              <div
                className="flex flex-row justify-between mb-6 md:mb-8"
                style={{ height: "3.125rem", alignItems: "center" }}
              >
                <SkillImage className="w-8 h-8">
                  <ReactLogoSVG className="w-8 h-8" />
                  <p>React / React-Native</p>
                </SkillImage>
                <SkillImage className="w-8 h-8">
                  <ReduxLogoSVG className="w-8 h-8" />
                  <p>Redux</p>
                </SkillImage>
                <SkillImage className="w-8 h-8 overflow-visible">
                  <JSLogoSVG className="w-8 h-8" />
                  <p>JavaScript</p>
                </SkillImage>
                <SkillImage className="w-8 h-8">
                  <TSLogoSVG className="w-8 h-8" />
                  <p>TypeScript</p>
                </SkillImage>
                <SkillImage className="w-8 h-8">
                  <NodeLogoSVG className="w-8 h-8" />
                  <p>Node.js</p>
                </SkillImage>
              </div>
              <div>
                <HeadingText>Always learning,</HeadingText>
                <BodyText>
                  and always using cutting edge tools. Working in the industry
                  for {today.current.getFullYear() - 2012} years, I've had some
                  time to pick up a ton of languages, frameworks, etc.
                </BodyText>
              </div>
              {/* <Button onClick={onOpen}>See more skills</Button> */}
            </div>
          </Content>

          {/* height={viewportHeight + 200} */}
          <Content>
            <div className="px-4">
              <HeadingText>In my free time,</HeadingText>
              <BodyText>
                I build tools for myself. Usually, it's stuff that helps me work
                better, be more productive, or explore a new domain for fun.
              </BodyText>
            </div>
            <div className="px-8">
              <Slider
                draggable
                swipeToSlide
                swipe
                className="mt-2 h-40 md:mt-8 md:h-auto"
                style={{ backgroundColor: "none" }}
                dots={false}
                // dotsClass="slick-dots"
                infinite={true}
                speed={500}
                slidesToShow={2}
                slidesToScroll={2}
                prevArrow={<PrevArrow />}
                nextArrow={<NextArrow />}
                // customPaging={i => <Dot />}
                responsive={[
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                    },
                  },
                  {
                    breakpoint: 767,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    },
                  },
                ]}
              >
                {projects.map(({ icon, name, description, repo, demo }) => (
                  <SlideItem>
                    <div className="flex flex-col justify-between h-32 md:h-64">
                      <div className="flex flex-col mb-1 md:mb-2">
                        <div className="flex flex-row mb-1 md:mb-2">
                          <div className="flex flex-col justify-center mr-1 md:mr-2">
                            <FontAwesomeIcon icon={projectIcons[icon]} />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h3 className="font-light text-sm md:text-lg">
                              {name}
                            </h3>
                          </div>
                        </div>
                        <p className="text-xs md:text-base">{description}</p>
                      </div>
                      <div style={{ width: "100%" }} className="flex flex-row">
                        {repo && (
                          <ChevronLinkContainer>
                            <a
                              href={repo}
                              className="font-light mr-8 text-sm md:text-lg"
                              target="_blank"
                            >
                              <FontAwesomeIcon
                                icon={faGithubSquare}
                                className="mr-1 type"
                              />
                              Code
                              <FontAwesomeIcon
                                className="ml-1 chevron "
                                icon={faChevronRight}
                              />
                            </a>
                          </ChevronLinkContainer>
                        )}
                        {demo && (
                          <ChevronLinkContainer>
                            <a
                              href={demo}
                              target="_blank"
                              className="font-light text-sm md:text-lg"
                            >
                              <FontAwesomeIcon
                                icon={faBrowser}
                                className="mr-1 type"
                              />
                              Demo
                              <FontAwesomeIcon
                                className="ml-1 chevron"
                                icon={faChevronRight}
                              />
                            </a>
                          </ChevronLinkContainer>
                        )}
                      </div>
                    </div>
                  </SlideItem>
                ))}
              </Slider>
            </div>
          </Content>

          {/* height={viewportHeight} */}
          <Content>
            <div className="px-4">
              <HeadingText>I'm out there,</HeadingText>
              <BodyText>
                Mostly publishing code, finding good libraries, and keeping up
                with tech news. Feel free to reach out on any of my platforms.
              </BodyText>
              <div className="flex flex-row justify-around mt-16">
                <IconButton
                  primaryColor={"transparent"}
                  secondaryColor={"#fff"}
                  icon={faGithub}
                  linkTo={"https://github.com/migsc"}
                  iconSize={1.5}
                />
                <IconButton
                  primaryColor={"transparent"}
                  secondaryColor={"#fff"}
                  icon={faTwitter}
                  linkTo={"https://twitter.com/mchateloin"}
                  iconSize={1.5}
                />
                <IconButton
                  primaryColor={"transparent"}
                  secondaryColor={"#fff"}
                  icon={faLinkedin}
                  linkTo={"https://www.linkedin.com/in/chateloin/"}
                  iconSize={1.5}
                />
              </div>
            </div>
          </Content>
        </PageScroller>
        <BottomNavBar
          currentSectionIndex={currentSectionIndex}
          currentPageIndex={currentPage}
          onPageChange={handlePageChange}
        />
      </Layout>
    </>
  )
}

export default CodePage
