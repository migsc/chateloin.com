import React from "react"
import styled from "styled-components"

const StyledAnchor = styled.a`
  &:hover {
  }
`

const StyledSpan = styled.span`
  border-bottom: solid 0.0625rem white;
  padding-bottom: 0.25rem;
  &:hover {
    border-bottom-width: 0.125rem;
  }
`

interface Props {
  href: string
  children?: any // TODO: Be more specific
  newTab?: boolean
}

const TextLink: React.FC<Props> = ({ href = "", children, newTab = false }) => {
  return (
    <StyledSpan>
      <StyledAnchor href={href} target={newTab ? "_blank" : ""}>
        {children}
      </StyledAnchor>
    </StyledSpan>
  )
}

export default TextLink
