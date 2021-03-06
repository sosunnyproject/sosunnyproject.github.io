import React from "react"
import Header from "../components/header"
import Container from "../components/container"
import { Link, graphql } from "gatsby"
import containerStyles from "../components/container.module.css"

export default function Blog({ data }) {
  return (
  <Container>
    <Header />
    <div className={containerStyles.postList}>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        (node.frontmatter.category === 'blog') && 
            <div key={node.id}>
              <Link to={node.fields.slug} >
                <h3>
                  {node.frontmatter.title}
                </h3>
              </Link>
              <h4>{node.frontmatter.date}</h4>
              <p>{node.excerpt}</p>
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
  ) {
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
          }
          fields {
            slug
          }
      }
    }
  }
}
`