import React from "react"
import Container from "../components/container"
import { graphql } from "gatsby"
import Header from "../components/header"
import * as containerStyles from "../components/container.module.css"
import '../styles/global.css';
import SEO from "../components/seo"
import { Disqus } from 'gatsby-plugin-disqus';

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  // const metaData = data.site.siteMetadata
  // const { title, comment, siteUrl, author, sponsor } = metaData
  // const { disqusShortName, utterances } = comment
  // const { title: postTitle, date } = post.frontmatter

  const disqusConfig = {
    url: `https://sosunnyproject.github.io${post.fields.slug}`, identifier: post.fields.slug, title: post.frontmatter.title
  }

  return (
    <Container>
      <SEO 
        title={post.frontmatter.title} 
        description={post.excerpt}
        pathname={post.fields.slug} 
      />
      <Header />
      <div className={containerStyles.postWrapper}>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>

      <Disqus config={disqusConfig} />
    </Container>
  )
}

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields{
        slug
      }
      frontmatter {
        title
        category
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`