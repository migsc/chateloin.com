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

import { useViewportDimensions } from "../hooks"

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

const Text = styled.Text`
  font-family: "Lato";
  font-size: ${({ size = 12 }) => size}px;
`

const Row = styled.View`
  flex-direction: row;
  margin: ${({ m = 0 }) => m}px;
  border: dashed 1px navy;
`

const Column = styled.View`
  flex: ${({ flex = 1 }) => flex};
  flex-direction: column;
  border: dashed 1px gray;
`

const Name = styled.Text`
  font-size: 24px;
`

const Title = styled.Text``

const Body = styled(Row)`
  flex: 1;
  flex-direction: row;
  border: dashed 1px blue;
  margin-left: 16px;
  margin-right: 16px;
`

const Line = styled.View`
  height: ${({ v, length = "100%" }) => (v ? length : "1px")};
  width: ${({ v, length = "100%" }) => (v ? "1px" : length)};
  background-color: black;
`

const getFAFamilyromProps = ({ brands, light, solid, duotone }) => {
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
}

const faDuoUnicodes = {
  building: "\u10f1ad",
}

const Icon = props => {
  const { duotone, size = 16, name } = props
  const fontFamily = getFAFamilyromProps(props)
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
    <Row>
      <Column flex={9} style={{ alignItems: "right" }}>
        <Text size={10}>{children}</Text>
      </Column>
      <Column flex={1} style={{ alignItems: "right" }}>
        <Icon size={10} solid name={icon} />
      </Column>
    </Row>
  )
}

const Header = () => (
  <Row m={16}>
    <Column flex={2}>
      <Name>MIGUEL CHATELOIN</Name>
      <Title>Frontend Software Engineer</Title>
    </Column>
    <Column flex={1}>
      <ContactDetail icon="building">miguel@chateloin.com</ContactDetail>
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

// Create Document Component
const ResumePage: React.FC = () => {
  const { height } = useViewportDimensions()
  return (
    <PDFViewer style={[styles.viewer, { height }]}>
      <Document title="Resume - Miguel Chateloin" author="Miguel Chateloin">
        <Page size="A4">
          <Header />
          <Body>
            <Column flex={2}>
              {/* <Line v /> */}
              <Text>EXPERIENCE</Text>
              {/* {jsonData.code.experience.maps} */}
            </Column>
            <Column flex={1}>
              {/* <Line v /> */}
              <Row>
                <Text>TOP SKILLS</Text>
              </Row>
              <Row>
                <Text>EDUCATION</Text>
              </Row>
            </Column>
          </Body>
          <Footer page={1} />
        </Page>
        <Page size="A4">
          <Header />
          <Body></Body>
          <Footer page={2} />
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default ResumePage

//TODO: horizontal line component
//TODO: vertical line component
