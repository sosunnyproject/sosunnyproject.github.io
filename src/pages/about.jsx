import React from "react"
import Header from "../components/header"
import Container from "../components/container"
import { graphql } from "gatsby"

export default function About({ data }) {
  return (
  <Container>
    <Header />
    <h1> Hello </h1>
    <h2>intro</h2>
    <h2>interests</h2>
    <h2>account</h2>
  </Container>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`