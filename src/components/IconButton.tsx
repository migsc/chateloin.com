import React, {
  ButtonHTMLAttributes,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestion, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { colors } from "../constants"
import { useSpring, config, animated } from "react-spring"
import { useViewportDimensions } from "../hooks"
import { ClickEvent, Children } from "../types"
import { startsWithHash, startsWithForwardSlash } from "../utils"

interface IconButtonProps {
  type?: string
  primaryColor?: string
  secondaryColor?: string
  icon?: IconDefinition
  linkTo?: string
  onClick?: (event: ClickEvent) => void
  style?: any
}

interface StyledIconButtonProps extends IconButtonProps {
  light: boolean
  as: string
  href: string
  target: string
}

export const StyledIconButton = styled(animated.button)<StyledIconButtonProps>`
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

interface StyledAnchorLinkProps extends IconButtonProps {}
const StyledAnchorLink = styled(StyledIconButton)<StyledAnchorLinkProps>``

const StyledIcon = styled(animated(FontAwesomeIcon))<{
  color: string
  size: number
}>`
  font-size: ${({ size }) => size}rem;
  display: flex;
  align-self: center;
  transition: 0.3s;
  color: ${({ color }) => color};
`

// #region LinkingContainerProps
interface LinkingContainerProps extends IconButtonProps {
  children: Children
  to: string // include base for hash links
}
const LinkingContainer: React.FC<LinkingContainerProps> = ({
  children,
  to,
  primaryColor,
  secondaryColor,
  onClick,
  ...props
}) => {
  const handleClick = e => {
    onClick(e)
    return false
  }

  if (startsWithHash(to)) {
    return (
      <StyledAnchorLink
        linkTo={to}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      >
        {children}
      </StyledAnchorLink>
    )
  } else if (startsWithForwardSlash(to)) {
    return null // TODO: implement this.
  } else {
    return (
      <StyledIconButton
        as="a"
        href={to}
        target="_blank"
        onClick={handleClick}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        size={1.5}
      >
        {children}
      </StyledIconButton>
    )
  }
}
// #endregion LinkingContainerProps
const IconButton: React.FC<IconButtonProps> = ({
  primaryColor = "",
  secondaryColor = "",
  icon = faQuestion,
  linkTo = "#", // hash link (include base), internal link, external links,
  onClick = e => {},
}) => {
  return (
    <LinkingContainer
      to={linkTo}
      onClick={onClick}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    >
      <StyledIcon light icon={icon} color={secondaryColor} />
    </LinkingContainer>
  )
}

export default IconButton
