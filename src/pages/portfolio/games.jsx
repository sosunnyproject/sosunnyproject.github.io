import React, { useState } from "react"
import Header from "../../components/header"
import Container from "../../components/container"
import { Link, graphql } from "gatsby"
import * as containerStyles from "../../components/container.module.css"
import PortfolioPost from "../../components/portfolioPost"
import Portfolio from "../portfolio"

export default function Games({ data }) {

  const [currentSub, setCurrentSub] = useState('games');

  return (
  <Container>
    <Header />
    <Portfolio />

    <div className={containerStyles.portfolioList}>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        ((node.frontmatter.category === 'portfolio') &&
        node.frontmatter.subcategory === currentSub) &&
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
    sort: [{frontmatter: {date: DESC}}, {frontmatter: {title: ASC}}]
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
            subcategory
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