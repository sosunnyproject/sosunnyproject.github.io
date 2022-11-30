import React from "react"
import Header from "../components/header"
import Container from "../components/container"
import { Link, graphql } from "gatsby"
import * as containerStyles from "../components/container.module.css"
import PortfolioPost from "./portfolioPost"

export default function Portfolio({ data }) {
  return (
  <Container>
    <Header />
    <div className={containerStyles.portfolioList}>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        (node.frontmatter.category === 'portfolio') &&
            <PortfolioPost node={node} key={node.id} />
        )
      )}
    </div>
  </Container>
  )
}

export const query = graphql`
query {
  site {
    siteMetadata {
      title
      author
    }
  }
  allMarkdownRemark(
    sort: {
      fields: [frontmatter___date,  frontmatter___title]
      order: DESC
    }
  ){
    totalCount
      edges {
        node {
          id
          excerpt(truncate: true)
          timeToRead
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            category
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  width: 540
                  height: 360
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
                  breakpoints: [750, 1080, 1366]
                )
              }
            }
          }
          fields {
            slug
          }
      }
    }
  }
}
`