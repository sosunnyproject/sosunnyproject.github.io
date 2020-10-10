import React from "react"
import Container from "../components/container"
import { graphql } from "gatsby"
import Header from "../components/header"
import containerStyles from "../components/container.module.css"

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  // const metaData = data.site.siteMetadata
  // const { title, comment, siteUrl, author, sponsor } = metaData
  // const { disqusShortName, utterances } = comment
  // const { title: postTitle, date } = post.frontmatter

  return (
    <Container>
      <Header />
      <div className={containerStyles.postWrapper}>
        <h2>{post.frontmatter.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Container>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        category
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`