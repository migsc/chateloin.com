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
import * as styles from "./IconButton.module.css"
import { colors } from "../constants"
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
} from "react-spring"
import { useViewportDimensions } from "../hooks"

interface IconButtonProps {
  primaryColor?: string
  secondaryColor?: string
  icon?: IconDefinition
  linkTo?: string
  onClick?: (event: ClickEvent) => void
  style?: any
}

interface StyledIconButtonProps extends IconButtonProps {
  active: boolean
}

const StyledIconButton = styled(animated.button)<StyledIconButtonProps>`
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

  opacity: ${({ active }) => (active ? `` : 0.6)};
  background-color: ${({ primaryColor }) => primaryColor};
  border-color: ${({ secondaryColor }) => secondaryColor};
  visibility: ${({ active }) => (active ? "hidden" : "visible")};

  &:hover {
    opacity: 1;
  }
`

const StyledIconView = styled(animated.div)<StyledIconButtonProps>`
  position: fixed;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  border-style: solid;
  border-width: 2px;
  height: 4rem;
  width: 4rem;
  border-radius: 100%;
  font-weight: "normal";
  background-color: ${({ primaryColor }) => primaryColor};
  border-color: ${({ secondaryColor }) => secondaryColor};
`

const StyledIcon = styled(animated(FontAwesomeIcon))<{ color: string }>`
  display: flex;
  align-self: center;
  transition: 0.3s;
  color: ${({ color }) => color};
`

// When I want to build animated transitions, look into the "navigate" function
// that you can pass into the Link component.
const IconButton: React.FC<IconButtonProps> = ({
  primaryColor = "",
  secondaryColor = "",
  icon = faQuestion,
  linkTo = "/#",
  onClick = e => {},
}) => {
  const [active, setActive] = useState(false)
  const buttonRef = useRef(null)
  const [startPosition, setStartPosition] = useState({
    top: "0px",
    left: "0px",
  })
  const { width: vWidth, height: vHeight } = useViewportDimensions()

  useEffect(() => {
    if (buttonRef?.current) {
      const rect = buttonRef?.current?.getBoundingClientRect()
      setStartPosition({
        top: `${Math.ceil(rect?.top || 0)}px`,
        left: `${Math.ceil(rect?.left || 0)}px`,
      })
      console.log("buttonRef.current", buttonRef.current)
    }
  }, [])

  console.log(
    "buttonRef?.current?.getBoundingClientRect().top",
    buttonRef?.current?.getBoundingClientRect()
  )

  const animatedContainerProps = useSpring({
    config: { duration: 400 },
    // transition: "2s",

    backgroundColor: primaryColor,
    borderRadius: "9999px",
    height: "74px",
    width: "74px",
    top: startPosition.top,
    left: startPosition.left,

    to: {
      backgroundColor: active ? secondaryColor : primaryColor,
      borderRadius: active ? "0px" : "9999px",
      height: active ? `${vHeight}px` : "74px",
      width: active ? `${vWidth}px` : "74px",
      top: active ? "0px" : startPosition.top,
      left: active ? "0px" : startPosition.left,
    },
  })

  const animatedIconProps = useSpring({
    config: config.slow,

    color: secondaryColor,
    fontSize: "1rem",
    opacity: 1,
    to: {
      color: active ? colors.Cream : secondaryColor,
      fontSize: active ? `7rem` : "1rem",
      opacity: active ? 0 : 1,
    },
  })

  const handleClick = e => {
    setActive(true)

    console.log(buttonRef?.current?.getBoundingClientRect().top)
    onClick(e)
    setTimeout(() => {
      navigate(linkTo)
    }, 500)
    return false
  }

  return (
    <>
      {active && (
        <StyledIconView
          style={{ ...animatedContainerProps }}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          active={active}
        >
          <StyledIcon
            light
            style={{ ...animatedIconProps }}
            icon={icon}
            color={colors.Cream}
          />
        </StyledIconView>
      )}
      <StyledIconButton
        ref={buttonRef}
        onClick={handleClick}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        active={active}
      >
        <StyledIcon light icon={icon} color={secondaryColor} />
      </StyledIconButton>
    </>
  )

  // return onClick ? (

  // ) : (
  //   <Link to={linkTo} className={styles.IconButton} style={style}>
  //     <FontAwesomeIcon
  //       light
  //       className={styles.icon}
  //       icon={icon}
  //       style={{ color: iconColor }}
  //       color={iconColor}
  //     />
  //   </Link>
  // )
}

export default IconButton