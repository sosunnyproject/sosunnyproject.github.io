import React from "react"
import Header from "../components/header"
import Container from "../components/container"
import { Link, graphql } from "gatsby"
import containerStyles from "../components/container.module.css"
import Img from "gatsby-image"

export default function Portfolio({ data }) {
  return (
  <Container>
    <Header />
    <div className={containerStyles.portfolioList}>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        (node.frontmatter.category === 'portfolio') && 
            <div key={node.id} className={containerStyles.portfolioCard}>
              <Link to={node.fields.slug} >
                <Img fluid={node.frontmatter?.featuredImage?.childImageSharp.fluid} />
                <h3>
                  {node.frontmatter.title}
                </h3>
              </Link>
                <h4>{node.frontmatter.date}</h4>
            </div>
        ))}
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
                fluid(maxWidth: 800, maxHeight: 600) {
                  ...GatsbyImageSharpFluid
                }
                fixed(width: 200) {
                  ...GatsbyImageSharpFixed
                }
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