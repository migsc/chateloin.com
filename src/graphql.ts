import { graphql } from "gatsby"

export const queryCodeAvatarImage = graphql`
  query {
    fileName: file(relativePath: { eq: "img/code-avatar.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 200, maxHeight: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
