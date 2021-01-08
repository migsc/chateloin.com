import React, { useEffect, useState } from "react"
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer"

// Create styles
const styles = StyleSheet.create({
  viewer: {
    width: "100%",
    margin: 0,
  },
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
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
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default ResumePage
