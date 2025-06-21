import React, { Fragment } from "react"
import Pre from "./Pre"

const lightThemeProps = {
  background: "#eee",
  color: "#000",
}

const darkThemeProps = {
  background: "#764ba2",
  color: "#eee",
}

const LIGHT = "LIGHT"
const DARK = "DARK"

const themes = {
  [LIGHT]: lightThemeProps,
  [DARK]: darkThemeProps,
}

interface Props {
  children?: JSON
  theme?: string
}

const FormattedJSONCode = ({ children = {}, theme = DARK }) => {
  return <Pre {...themes[theme]}>{JSON.stringify(children, null, 4)}</Pre>
}

export default FormattedJSONCode
