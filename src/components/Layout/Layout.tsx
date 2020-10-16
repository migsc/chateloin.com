/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import Footer from "./Footer"
import * as styles from "./Layout.module.css"
import { ThemeProvider, CSSReset } from "@chakra-ui/core"

interface Props {
  children: JSX.Element[]
  scrollable?: boolean
  className?: string
  bodyClassName?: string
  showFooter?: boolean
}

const joinWithoutEmpty = (
  ...args: (string | null | boolean | undefined)[]
): string => {
  return args?.filter(str => !!str)?.join(" ")
}

const Layout: React.FC<Props> = ({
  children,
  scrollable = true,
  className,
  bodyClassName: bodyClassNamePassed,
  showFooter = true,
}) => {
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
    <ThemeProvider>
      <Helmet
        bodyAttributes={{
          class: joinWithoutEmpty(
            bodyClassNamePassed,
            !scrollable && styles.noscroll
          ),
        }}
        htmlAttributes={{
          class: joinWithoutEmpty(!scrollable && styles.noscroll),
        }}
      />

      <div className={className}>
        {children}
        {showFooter && <Footer absolutePosition={!scrollable} />}
      </div>
    </ThemeProvider>
  )
}

export default Layout

/*

small
  640
medium
  768
large
  1024
extra large
  1280

*/
