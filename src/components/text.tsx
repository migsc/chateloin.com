import React from "react"

const HeadingText = ({ children }) => (
  <h1 className="text-6xl mb-8">{children}</h1>
)

const BodyText = ({ children }) => <p className="text-3xl">{children}</p>

export { HeadingText, BodyText }
