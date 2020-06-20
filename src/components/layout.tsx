/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

interface Props {
  children: JSX.Element[]
}

const Layout: React.FC<Props> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6">
        <main>{children}</main>
        <footer className="text-2xs text-center absolute bottom-0 pb-4 left-0 right-0 sm:text-xs">
          © {new Date().getFullYear()}, Miguel Chateloin - All Rights Reserved
        </footer>
      </div>
    </>
  )
}

export default Layout
