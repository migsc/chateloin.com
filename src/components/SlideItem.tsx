import React from "react"
import styled from "styled-components"
import FrostedGlass from "../components/FrostedGlass"

const Container = styled.div`
  padding: 1rem;
  overflow: hidden;
`
const BorderedBox = styled.div`
  border: white solid 1px;
  padding: 1rem;
`

interface Props {
  children: any
  style?: any
}

const SlideItem: React.FC<Props> = ({ children, style }) => {
  return (
    <Container>
      <BorderedBox style={style} className="rounded">
        {children}
      </BorderedBox>
    </Container>
  )
}

export default SlideItem
