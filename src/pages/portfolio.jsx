import React from "react"
import Header from "../components/header"
import Container from "../components/container"
import { Link, graphql } from "gatsby"
import containerStyles from "../components/container.module.css"
import SEO from "../components/seo"

export default function Portfolio({ data }) {
  return (
  <Container>
    <Header />
    <div className={containerStyles.postList}>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        (node.frontmatter.category === 'portfolio') && 
            <div key={node.id}>
              <SEO 
                  title={node.frontmatter.title} 
                  description={node.excerpt}
                  pathname={node.fields.slug} />
              <Link to={node.fields.slug} >
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
          }
          fields {
            slug
          }
      }
    }
  }
}
`