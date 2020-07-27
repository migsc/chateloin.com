import React from "react"
import NavButton from "./NavButton"

export default {
  title: "NavButton",
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

export const Default = () => <NavButton />
