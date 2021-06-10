import React from "react"
import Header from "../components/header"
import Container from "../components/container"
import containerStyles from "../components/container.module.css"
import { Link } from "gatsby"
import '../styles/global.css';

export default function Home({ data }) {
  return (
  <Container >
    <Header />

    <div className={containerStyles.index}>
      <h1>Write Code, Make Art</h1>

      <p>
      a sassy girl loved musical theaters so much she <span role="img" aria-label="airplane">✈️</span> to New York Broadway & Vassar <span role="img" aria-label="the statue of liberty">🗽</span>
      When life was giving her <span role="img" aria-label="lemon">🍋🍋🍋</span>, she found some 💎 
      in the land of <Link to="/blog">software engineering </Link> 💻 
      Yet, as she still loves <span role="img" aria-label="arts">🎨</span> <span role="img" aria-label="theater">🎭</span> she has started <Link to="/portfolio"> combining media and technology </Link> 
      through VR, AR, mixed media, and <a target="_blank" rel="noreferrer" href="https://www.instagram.com/sosunnyproject">creative coding. </a>
      Currently in Seoul, she is a full-time frontend dev during the day and creative coder at night.
      </p>

      <p className={containerStyles.indexBottom}>
      Recently watched <span className={containerStyles.highlightSpan}>
        <a href="https://www.youtube.com/watch?v=3s0LTDhqe5A" rel="noreferrer" target="_blank">
          My Octopus Teacher
        </a>
      </span>, 
      read <span className={containerStyles.highlightSpan}>
        <a href="https://www.youtube.com/watch?v=vlfda_doSd4" rel="noreferrer" target="_blank">
        The Upward Spiral 우울할땐 뇌과학
        </a>
      </span>
      , donated to <span className={containerStyles.highlightSpan}>
        <a href="https://www.goodneighbors.kr/business/korea_welfare/childcare.gn" rel="noreferrer" target="_blank">
      GoodNeighbors</a>
      </span> 
      </p>
    </div>
  </Container>
  )
}