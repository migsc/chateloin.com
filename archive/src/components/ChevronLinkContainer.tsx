import React from "react"
import styles from "./ChevronLinkContainer.module.css"
import styled from "styled-components"
interface Props {
  children: any
}

const Container = styled.div`
  & * {
    transition: 0.3s;
  }

  &:hover a .type {
    margin-right: 0.5rem;
  }

  &:hover a {
    font-weight: 400;
  }

  &:hover a .chevron {
    margin-left: 0.5rem;
    font-weight: 400;
  }
`

const ChevronLinkContainer: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>
}

export default ChevronLinkContainer
