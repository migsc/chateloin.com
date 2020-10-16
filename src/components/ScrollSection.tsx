import React, { useEffect, useState } from "react"
import { Waypoint } from "react-waypoint"
import styled from "styled-components"
import { Children } from "../types"

const StyledSection = styled.section`
  /* border: dashed 1px black;
  width: auto;
  overflow: hidden; */
`

interface ScrollSectionProps {
  id: string
  index: number
  children: Children
  height?: number
  marginBottom?: number
  onEnter: Function // TODO: Better type for this
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
  id,
  index,
  children,
  height,
  marginBottom,
  onEnter = props => {},
}) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
    return () => setReady(false)
  }, [])

  const handleScrollInto = () => {
    if (ready) {
      window.location.hash = `#${id}`
      onEnter({ index })
    }
  }

  return (
    <StyledSection
      // className="border-indigo-600 border-dashed border-solid border-2"
      style={{ height, marginBottom }}
      id={id}
    >
      {/* <Waypoint onEnter={handleScrollInto} /> */}
      {children}
      {/* <Waypoint onEnter={handleScrollInto} /> */}
    </StyledSection>
  )
}

export default ScrollSection
