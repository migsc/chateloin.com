import React, { useEffect, useState } from "react"
import {
  PDFViewer,
  Document,
  Image,
  Page,
  // Text as RPText,
  Font,
  View,
  StyleSheet,
} from "@react-pdf/renderer"
import styled from "@react-pdf/styled-components"
import dayjs from "dayjs"

import { useViewportDimensions, useIsClient } from "../hooks"

import LatoThin from "../assets/fonts/Lato-Thin.ttf"
import LatoLight from "../assets/fonts/Lato-Light.ttf"
import LatoRegular from "../assets/fonts/Lato-Regular.ttf"
import LatoBold from "../assets/fonts/Lato-Bold.ttf"
import LatoBlack from "../assets/fonts/Lato-Black.ttf"

import faBrands from "../assets/fonts/fa-brands-400.ttf"
import faDuotone from "../assets/fonts/fa-duotone-900.ttf"
import faLight from "../assets/fonts/fa-light-300.ttf"
import faRegular from "../assets/fonts/fa-regular-400.ttf"
import faSolid from "../assets/fonts/fa-solid-900.ttf"

import svgBuilding from "../assets/images/building.svg"

import jsonData from "../data.json"

// Font.register({
//   family: "Font Awesome",
//   fonts: [
//     // { src: faDuotone, fontWeight: 900 },
//     { src: faSolid, fontWeight: 900 },
//     { src: faRegular, fontWeight: 400 },
//     { src: faLight, fontWeight: 300 },
//   ],
// })

Font.register({
  family: "Font Awesome Light",
  src: faLight,
})

Font.register({
  family: "Font Awesome Regular",
  src: faRegular,
})

Font.register({
  family: "Font Awesome Solid",
  src: faSolid,
})

Font.register({
  family: "Font Awesome Brands",
  src: faBrands,
})

Font.register({
  family: "Font Awesome Duotone",
  src: faDuotone,
})

Font.register({
  family: "Lato",
  fonts: [
    { src: LatoThin, fontWeight: 100 },
    { src: LatoLight, fontWeight: 300 },
    { src: LatoRegular, fontWeight: 400 },
    { src: LatoBold, fontWeight: 700 },
    { src: LatoBlack, fontWeight: 900 },
  ],
})

const getFontWeightFromProps = ({ thin, light, bold, bolder }) => {
  if (thin) return 100
  else if (light) return 300
  else if (bold) return 700
  else if (bolder) return 900
  else return 400
}

const StyledText = styled.Text`
  font-family: "Lato";
  font-size: ${({ size = 10 }) => size}px;
  ${({ m }) => (m ? `margin: ${m}px;` : "")}
  ${({ mt }) => (mt ? `margin-top: ${mt}px;` : "")}
  ${({ mb }) => (mb ? `margin-bottom: ${mb}px;` : "")}
  ${({ ml }) => (ml ? `margin-left: ${ml}px;` : "")}
  ${({ mr }) => (mr ? `margin-right: ${mr}px;` : "")}
`
const Text = props => {
  const fontWeight = getFontWeightFromProps(props)
  return <StyledText style={{ fontWeight }} {...props} />
}
// font-weight: ${props => getFontWeightFromProps(props)};

const Row = styled.View`
  flex-direction: row;
  ${({ m }) => (m ? `margin: ${m}px;` : "")}
  ${({ mt }) => (mt ? `margin-top: ${mt}px;` : "")}
  ${({ mb }) => (mb ? `margin-bottom: ${mb}px;` : "")}
  ${({ ml }) => (ml ? `margin-left: ${ml}px;` : "")}
  ${({ mr }) => (mr ? `margin-right: ${mr}px;` : "")}
`

const Column = styled.View`
  flex: ${({ flex = 1 }) => flex};
  flex-direction: column;
`

const Body = styled(Row)`
  flex: 1;
  flex-direction: row;
  margin-left: 16px;
  margin-right: 16px;

  /* border: dashed 1px blue; */
`

const Line = styled.View`
  height: ${({ v, length = "100%" }) => (v ? length : "1px")};
  width: ${({ v, length = "100%" }) => (v ? "1px" : length)};
  position: absolute;
  background-color: black;
`

const BorderedView = ({ children }) => {
  return (
    <View style={{ paddingLeft: 24, paddingRight: 24 }}>
      <Line style={{ left: 8 }} v />
      {children}
    </View>
  )
}

const getFAFamilyFromProps = ({ brands, light, solid, duotone }) => {
  if (brands) return "Font Awesome Brands"
  else if (duotone) return "Font Awesome Duotone"
  else if (solid) return "Font Awesome Solid"
  else if (light) return "Font Awesome Light"
  else return "Font Awesome Regular"
}

// const Icon = styled(Text)`
//   font-family: ${props => getFAFamilyromProps(props)};
//   font-size: 32px;
// `

const faUnicodes = {
  building: "\uf1ad",
  envelope: "\uf0e0",
  phone: "\uf095",
  browser: "\uf37e",
  circle: "\uf111",
  wrench: "\uf0ad",
  "graduation-cap": "\uf19d",
  github: "\uf09b",
  twitter: "\uf099",
  linkedin: "\uf08c",
  coffee: "\uf0f4",
  "mug-tea": "\uf875",
  tools: "\uf7d9",
  toolbox: "\uf552",
  language: "\uf1ab",
  "pencil-alt": "\uf303",
  sitemap: "\uf0e8",
  "share-alt": "\uf1e0",
  heart: "\uf004",
  "piano-keyboard": "\uf8d5",
  "gamepad-alt": "\uf8bc",
  "alien-monster": "\uf8f6",
  podcast: "\uf2ce",
  "chevron-right": "\uf054",
  scrubber: "\uf2f8",
}

const faDuoUnicodes = {
  building: "\u10f1ad",
}

const Icon = props => {
  const { duotone, size = 16, name } = props
  const fontFamily = getFAFamilyFromProps(props)
  return (
    <Text style={{ fontFamily, fontSize: size }}>
      {duotone ? faDuoUnicodes[name] : faUnicodes[name]}
    </Text>
  )
}

// Create styles
const styles = StyleSheet.create({
  viewer: {
    width: "100%",
    margin: 0,
  },
})

const useWindowSize = () => {
  const [state, setState] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    function updateWindowState() {
      setState({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener("resize", updateWindowState)
    return () => window.removeEventListener("resize", updateWindowState)
  }, [])

  return state
}

const ContactDetail = ({ children, icon }) => {
  return (
    <Row style={{ marginBottom: 4 }}>
      <Column flex={9} style={{ alignItems: "right" }}>
        <Text>{children}</Text>
      </Column>
      <Column flex={1} style={{ alignItems: "right" }}>
        <Icon size={10} light name={icon} />
      </Column>
    </Row>
  )
}

const Header = () => (
  <Row m={16}>
    <Column flex={2}>
      <Text size={24} bolder mb={2}>
        Miguel Chateloin
      </Text>
      <Text light>FRONTEND SOFTWARE ENGINEEER</Text>
    </Column>
    <Column flex={1}>
      <ContactDetail icon="envelope">miguel@chateloin.com</ContactDetail>
      <ContactDetail icon="phone">+1-(786)-973-0629</ContactDetail>
      <ContactDetail icon="browser">chateloin.com</ContactDetail>
    </Column>
  </Row>
)

const Footer = ({ page }) => (
  <Row m={16}>
    <Text style={{ textAlign: "right" }}>Page {page}/2</Text>
  </Row>
)

const SectionTitle = ({ children, icon, ...props }) => (
  <Row
    style={{ alignContent: "center", paddingBottom: 4, paddingTop: 4 }}
    {...props}
  >
    <View>
      <Icon name={icon} solid />
    </View>
    <Text ml={8} size={12} bold>
      {children}
    </Text>
  </Row>
)

const Event = styled.View``
Event.Time = ({ from, to, place }) => {
  const formattedFrom = formatPeriodDate(from)
  const formattedTo = to ? formatPeriodDate(to) : "Present"
  return (
    <Row style={{ alignContent: "center" }}>
      <View
        style={{
          position: "absolute",
          left: -20.5,
          backgroundColor: "white",
          width: 10,
          height: 10,
        }}
      >
        <Icon name="circle" size={10} />
      </View>
      <Text light mt={-2} mb={2}>
        {formattedFrom} - {formattedTo} <Text regular>@</Text> {place}
      </Text>
    </Row>
  )
}
Event.Title = ({ children }) => (
  <Text bold mb={4} size={12}>
    {children}
  </Text>
)
Event.Skills = ({ children }) => (
  <Text bold mb={4}>
    <Icon name="wrench" size={10} solid /> {children}
  </Text>
)
Event.Bullet = ({ children }) => (
  <Text mb={2}>
    <Icon name="chevron-right" size={8} /> {children}
  </Text>
)
Event.Link = ({ children }) => (
  <Text>
    <Icon name="chevron-right" size={8} /> {children}
  </Text>
)

const Project = Event
Project.Title = Event.Title
Project.Skills = Event.Skills
Project.Description = styled(Text)``
Project.Link = ({ children, type }) => {
  const iconProps = {
    repo: {
      name: "github",
      brands: true,
    },
    demo: {
      name: "browser",
    },
  }[type]
  return (
    <Text>
      <Icon {...iconProps} />
      {children}
    </Text>
  )
}

const IconBullet = ({ children, icon }) => {
  return (
    <Text>
      <Icon name={icon} />
      {children}
    </Text>
  )
}

const formatPeriodDate = str => dayjs(str).format("MMM YYYY")

const Margin = styled.View`
  margin-top: ${({ top = 0, v = 0 }) => top || v}px;
  margin-bottom: ${({ bottom = 0, v = 0 }) => bottom || v}px;
  margin-left: ${({ left = 0, h = 0 }) => left || h}px;
  margin-right: ${({ right = 0, h = 0 }) => right || h}px;
`

// Create Document Component
const ResumePage: React.FC = () => {
  const { height } = useViewportDimensions()
  const {
    pages: {
      code: {
        experience: { jobs, education: certs },
        skills: { hard: skills },
        projects,
      },
    },
  } = jsonData

  const otherSkills = [
    { icon: "sitemap", text: "Passion for UI/UX" },
    { icon: "eye", text: "Eye for design" },
    { icon: "language", text: "Fluent in Spanish" },
    { icon: "pencil-alt", text: "Journalism writing background" },
  ]

  const connects = [
    { icon: "twitter", text: "twitter.com/mchateloin" },
    { icon: "linkedin", text: "linkedin.com/in/chateloin" },
    { icon: "github", text: "github.com/migsc" },
  ]

  const hobbies = [
    { icon: "piano-keyboard", text: "Music production" },
    { icon: "gamepad-alt", text: "PC Gaming" },
    { icon: "alien-monster", text: "Pixel Art" },
    { icon: "podcast", text: "Podcasts" },
    { icon: "dice", text: "Tabletop Games" },
  ]

  const shouldRender = useIsClient()

  return (
    shouldRender && (
      <PDFViewer style={[styles.viewer, { height }]}>
        <Document title="Resume - Miguel Chateloin" author="Miguel Chateloin">
          {/* page 1 */}
          <Page size="A4">
            <Header />
            <Body>
              <Column flex={2}>
                <SectionTitle icon="coffee" mb={4}>
                  EXPERIENCE
                </SectionTitle>
                <BorderedView>
                  {jobs.map(
                    ({ period, place, name, skills, accomplishments }) => (
                      <View key={place}>
                        <Event>
                          <Event.Time
                            from={period.from}
                            to={period.to}
                            place={place}
                          />
                          <Event.Title>{name}</Event.Title>
                          {accomplishments.map(text => (
                            <Event.Bullet>{text}</Event.Bullet>
                          ))}
                          <Event.Skills>{skills.join(", ")}</Event.Skills>
                        </Event>
                        <Margin v={8} />
                      </View>
                    )
                  )}
                </BorderedView>
              </Column>

              <Column flex={1}>
                <SectionTitle icon="tools" mb={16}>
                  TOP SKILLS
                </SectionTitle>
                <BorderedView>
                  {skills.map(({ name }) => (
                    <View>
                      <Text key={name}>{name}</Text>
                    </View>
                  ))}
                </BorderedView>

                <SectionTitle icon="graduation-cap" mb={16}>
                  EDUCATION
                </SectionTitle>
                <BorderedView>
                  {certs.map(({ period, place, name, accomplishments }) => (
                    <Event key={place}>
                      <Event.Time
                        from={period.from}
                        to={period.to}
                        place={place}
                      />
                      <Event.Title>{name}</Event.Title>

                      {accomplishments.map(text => (
                        <Event.Bullet key={text}>{text}</Event.Bullet>
                      ))}
                      <Margin v={16} />
                    </Event>
                  ))}
                </BorderedView>
              </Column>
            </Body>
            <Footer page={1} />
          </Page>
          {/* page 2 */}
          <Page size="A4">
            <Header />
            <Body>
              <Column flex={2}>
                <SectionTitle icon="mug-tea" mb={4}>
                  SIDE PROJECTS
                </SectionTitle>
                <BorderedView>
                  {projects.map(({ name, skills, description, repo, demo }) => (
                    <Project key={name}>
                      <Project.Title>{name}</Project.Title>
                      <Project.Skills>{skills.join(", ")}</Project.Skills>
                      <Project.Description>{description}</Project.Description>
                      {repo && <Project.Link type="repo">{repo}</Project.Link>}
                      {demo && <Project.Link type="demo">{demo}</Project.Link>}
                      <Margin v={8} />
                    </Project>
                  ))}
                </BorderedView>
              </Column>
              <Column flex={1}>
                <SectionTitle icon="toolbox" mb={16}>
                  OTHER SKILLS
                </SectionTitle>
                <BorderedView>
                  {otherSkills.map(({ icon, text }) => (
                    <IconBullet key={text} icon={icon}>
                      {text}
                    </IconBullet>
                  ))}
                </BorderedView>
                <SectionTitle icon="share-alt" mb={16}>
                  CONNECT
                </SectionTitle>
                <BorderedView>
                  {connects.map(({ icon, text }) => (
                    <IconBullet key={text} icon={icon}>
                      {text}
                    </IconBullet>
                  ))}
                </BorderedView>
                <SectionTitle icon="heart" mb={16}>
                  HOBBIES & INTERESTS
                </SectionTitle>
                <BorderedView>
                  {hobbies.map(({ icon, text }) => (
                    <IconBullet key={text} icon={icon}>
                      {text}
                    </IconBullet>
                  ))}
                </BorderedView>
              </Column>
            </Body>
            <Footer page={2} />
          </Page>
        </Document>
      </PDFViewer>
    )
  )
}

export default ResumePage

// // TODO: make name, headings lowercase and large

// import HomePage from "./home"

// export default HomePage
