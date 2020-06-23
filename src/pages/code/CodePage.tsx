import React from "react"
import { Link } from "gatsby"
import SEO from "../../components/seo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ScrollableLayout from "../components/ScrollableLayout"
import pageData from "../../data/code-page.json"
import Layout from "../../components/Layout"
import styles from "./CodePage.module.css"

const CodePage: React.FC = () => {
  const { skills, experience, social } = pageData

  return (
    <Layout className={styles.background}>
      <SEO title="miguel chateloin / code" />
      <div className="max-w-xs py-12 md:py-48 md:max-w-sm lg:max-w-lg sm:mx-auto">
        <div>
          <h1 className="text-4xl mb-4">
            miguel <br />
            chateloin
          </h1>
          <p className="text-xl">
            A cool "Coding" page tagline would go here. This is like the
            "Objective" section of a resume.
          </p>
        </div>

        <div className="mt-16 mb-16">
          <h2 className="mb-8">skills</h2>
          <div>{JSON.stringify(skills)}</div>
        </div>
        <div className="mt-16 mb-16">
          <h2 className="mb-8">experience</h2>
          <div>
            <pre>{JSON.stringify(experience)}</pre>
          </div>
        </div>
        <div className="mt-16 mb-16">
          <h2 className="mb-8">connect</h2>
          <div>{JSON.stringify(social)}</div>
        </div>
      </div>
    </Layout>
  )
}

export default CodePage
