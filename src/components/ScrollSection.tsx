import React from "react"
import { Waypoint } from "react-waypoint"
import styled from "styled-components"

import { useViewportDimensions } from "../hooks"

const StyledSection = styled.section`
  border: solid 1px black;
  width: auto;
  overflow: hidden;
`

const ScrollSection = ({
  index,
  children,
  refThis,
  onEnter = props => {},
}) => {
  const { height: viewportHeight } = useViewportDimensions()

  const handleScrollInto = () => {
    onEnter({ ref: refThis, index })
  }

  return (
    <StyledSection style={{ height: viewportHeight }} ref={refThis}>
      <Waypoint onEnter={handleScrollInto} />
      {children}
    </StyledSection>
  )
}

export default ScrollSection
