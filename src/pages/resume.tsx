import React, { useEffect, useState } from "react"
import {
  PDFViewer,
  Document,
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
  background-color: red;
`

const Name = styled(Text)`
  font-size: 24px;
`

const Title = styled(Text)``

const Body = styled(Row)`
  background-color: blue;
`

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
            <Text>Body</Text>
          </Body>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default ResumePage
