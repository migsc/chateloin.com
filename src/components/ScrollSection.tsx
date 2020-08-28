import React from "react"
import { Waypoint } from "react-waypoint"
import styled from "styled-components"

import IconButton from "./IconButton"

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
  refNext,
  onEnter = props => {},
  onNext = () => {},
}) => {
  const { height: viewportHeight } = useViewportDimensions()

  const handleScrollInto = () => {
    onEnter({ ref: refThis, index })
  }

  return (
    <StyledSection style={{ height: viewportHeight }} ref={refThis}>
      <Waypoint onEnter={handleScrollInto} />
      {children}
      {refNext && <IconButton onClick={onNext} />}
    </StyledSection>
  )
}

export default ScrollSection
