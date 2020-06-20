import React from "react"
import { Link } from "gatsby"
import "../components/global.css"
import SEO from "../components/seo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Layout from "../components/layout"

const CodePage: React.FC = () => {
  return (
    <Layout>
      <SEO title="miguel chateloin / code" />
      <div className="max-w-xs py-12 md:py-48 md:max-w-sm lg:max-w-lg sm:mx-auto">
        <h1 className="text-4xl mb-4">
          miguel <br />
          chateloin
        </h1>
        <p className="text-xl">
          A cool "Coding" page tagline would go here. This is like the
          "Objective" section of a resume.
          <FontAwesomeIcon icon="code" />
          <Link to="/code">Link to code</Link>
        </p>
      </div>
    </Layout>
  )
}

export default CodePage
