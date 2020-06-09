import React from "react"
import { Link } from "gatsby"
import "../components/global.css"
import Image from "../components/image"
import SEO from "../components/seo"
// import FA from "@fortawesome/fontawesome-free"

const MenuItem: React.FC = () => (
  <div className="bg-gray-200 h-16 w-16 rounded-full"></div>
)

const IndexPage: React.FC = () => (
  <>
    <SEO title="Miguel Chateloin" />
    <div className="container mx-auto">
      <h1>Miguel Chateloin</h1>
      <p>A pretty cool guy with a cool guy tagline that goes here.</p>
      <div className="flex flex-row justify-between">
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </div>

    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </>
)

export default IndexPage
