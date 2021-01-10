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
`

const Row = styled.View`
  flex-direction: row;
`

const Column = styled.View`
  flex-direction: column;
`

const Header = styled(Row)`
  border: dashed 1px red;
  margin: 16px;
`

const Name = styled.Text`
  font-size: 24px;
`

const Title = styled.Text``

const Body = styled(Row)`
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

// Create Document Component
const ResumePage: React.FC = () => {
  const { height } = useWindowSize()
  return (
    <PDFViewer style={[styles.viewer, { height }]}>
      <Document title="Resume - Miguel Chateloin" author="Miguel Chateloin">
        <Page size="A4">
          <Header>
            <Column>
              <Name>Miguel Chateloin</Name>
              <Title>Frontend Software Engineer</Title>
            </Column>
            <Column>
              <Text>miguel@chateloin.com</Text>
              <Text>+1-(786)-973-0629</Text>
              <Text>chateloin.com</Text>
            </Column>
          </Header>
          <Body>
            {/* <Text>Body</Text> */}
            {/* <Icon light name="building" /> */}

            <Line h />
            <Line v />
          </Body>
        </Page>
        <Page size="A4">
          <Header>
            <Column>
              <Name>Miguel Chateloin</Name>
              <Title>Frontend Software Engineer</Title>
            </Column>
            <Column>
              <Text>miguel@chateloin.com</Text>
              <Text>+1-(786)-973-0629</Text>
              <Text>chateloin.com</Text>
            </Column>
          </Header>
          <Body>{/* <Text>Body</Text> */}</Body>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default ResumePage

//TODO: horizontal line component
//TODO: vertical line component
