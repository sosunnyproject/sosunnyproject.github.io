import React from "react"
import { Link, graphql } from "gatsby"
import * as containerStyles from "../components/container.module.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function PortfolioPost({ node }) {
    const image = getImage(node.frontmatter?.featuredImage)
    return (
        <div key={node.id} className={containerStyles.portfolioCard}>
            <Link to={node.fields.slug} >
            <GatsbyImage 
                image={image}
                alt=""
                layout="fullWidth"
                width={480}
                aspectRatio={16/9}
            />
            <h3>
                {node?.frontmatter?.title}
            </h3>
            </Link>
            <h4>{node?.frontmatter?.date}</h4>
        </div>
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
  allMarkdownRemark{
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