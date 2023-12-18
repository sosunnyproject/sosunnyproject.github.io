import React, { useState } from "react"
import Header from "../components/header"
import Container from "../components/container"
import { Link, graphql } from "gatsby"
import * as containerStyles from "../components/container.module.css"
import PortfolioPost from "../components/portfolioPost"

export default function Portfolio({ data }) {

  const [currentSub, setCurrentSub] = useState('games');
  function isActiveCategory(subHeader) {
    if(currentSub === subHeader) {
      return containerStyles.pf_subheader_selected
    } else {
      return containerStyles.pf_subheader_btn
    }
  }

  return (
  <Container>
    <Header />
    <div className={containerStyles.pf_subheader_wrapper}>
      <button className={isActiveCategory('games')} onClick={() => setCurrentSub('games')}> Games </button>
      <button className={isActiveCategory('graphics')} onClick={() => setCurrentSub('graphics')}> Graphics </button>
      <button className={isActiveCategory('web')} onClick={() => setCurrentSub('web')}> Web/App </button>
      <button className={isActiveCategory('XR')} onClick={() => setCurrentSub('XR')}> XR </button>
      <button className={isActiveCategory('edu')} onClick={() => setCurrentSub('edu')}> Education </button>
    </div>

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
            date
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