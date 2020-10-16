import React from "react"

const HeadingText = ({ children, className = "" }) => (
  <h1 className={`text-4xl mb-4 ${className} md:text-6xl md:mb-8`}>{children}</h1>
)

const BodyText = ({ children, className }) => (
  <p className={`text-2xl ${className} md:text-3xl`}>{children}</p>
)

export { HeadingText, BodyText }
