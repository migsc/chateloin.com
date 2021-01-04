import React from "react"

interface Props {
  absolutePosition?: Boolean
}

const absolutePositionClassNames = "absolute bottom-0 left-0 right-0"

const Footer: React.FC<Props> = ({ absolutePosition = false }) => {
  return (
    <footer
      className={`text-2xs text-center pb-4 sm:text-xs ${
        absolutePosition ? absolutePositionClassNames : ""
      }`}
    >
      © {new Date().getFullYear()} Miguel Chateloin. All rights reserved.
    </footer>
  )
}

export default Footer
