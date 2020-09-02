import React, {
  ButtonHTMLAttributes,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react"
import { Link, navigate } from "gatsby"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestion, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { ClickEvent } from "../../types"

interface IconButtonProps {
  primaryColor?: string
  secondaryColor?: string
  icon?: IconDefinition
  linkTo?: string
  onClick?: (event: ClickEvent) => void
  style?: any
}

const StyledIconButton = styled.button<IconButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  border-style: solid;
  border-width: 2px;
  height: 4rem;
  width: 4rem;
  transition: 0.4s;
  border-radius: 100%;
  font-weight: "normal";

  opacity: 0.6;
  background-color: ${({ primaryColor }) => primaryColor};
  border-color: ${({ secondaryColor }) => secondaryColor};

  &:hover {
    opacity: 1;
  }
`

const StyledIcon = styled(FontAwesomeIcon)<{ color: string }>`
  display: flex;
  align-self: center;
  transition: 0.3s;
  color: ${({ color }) => color};
`

const IconButton: React.FC<IconButtonProps> = ({
  primaryColor = "",
  secondaryColor = "",
  icon = faQuestion,
  linkTo = "",
  onClick = e => {},
}) => {
  const handleClick = e => {
    onClick(e)
    if (linkTo) navigate(linkTo)
    return false
  }

  return (
    <StyledIconButton
      onClick={handleClick}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    >
      <StyledIcon light icon={icon} color={secondaryColor} />
    </StyledIconButton>
  )
}

export default IconButton
