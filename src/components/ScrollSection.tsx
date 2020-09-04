import React from "react"
import { Waypoint } from "react-waypoint"
import styled from "styled-components"
import { Children } from "../types"
import { useViewportDimensions } from "../hooks"

const StyledSection = styled.section`
  border: solid 1px black;
  width: auto;
  overflow: hidden;
`

interface ScrollSectionProps {
  id: string
  index: number
  children: Children
  onEnter: Function // TODO: Better type for this
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
  id,
  index,
  children,
  onEnter = props => {},
}) => {
  const { height: viewportHeight } = useViewportDimensions()

  const handleScrollInto = () => {
    onEnter({ index })
  }

  return (
    <StyledSection style={{ height: viewportHeight }} id={id}>
      <Waypoint onEnter={handleScrollInto} />
      {children}
    </StyledSection>
  )
}

export default ScrollSection
