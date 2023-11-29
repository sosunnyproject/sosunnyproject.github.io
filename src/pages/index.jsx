import React from "react"
import Header from "../components/header"
import Container from "../components/container"
import * as containerStyles from "../components/container.module.css"
import { Link } from "gatsby"
import '../styles/global.css';

export default function Home({ data }) {
  return (
  <Container >
    <Header />

    <div className={containerStyles.index}>
      <h1>Write Code, Make Art</h1>
{/* 
      <div className={containerStyles.indexVideoWrapper}>
        <iframe className={containerStyles.indexVideo} width="90%" height="auto" src="https://www.youtube.com/embed/HJYgOmYNM3U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div> */}

      <p>
      a sassy girl loved musical theaters so much she <span role="img" aria-label="airplane">✈️</span> to New York & Vassar <span role="img" aria-label="the statue of liberty">🗽</span>
       When life was giving her <span role="img" aria-label="lemon">🍋</span>, she found some 💎 
      in the land of <a target="_blank" href="https://www.linkedin.com/in/sosunpark">software engineering </a> 💻 
      She's been fascinated by how math, technology and arts can be <Link to="/portfolio/games">intertwined through graphics and games. </Link> 
      </p>
      <p>
       Currently in LA, she's studying M.S. Game Design and Development (USC) and passionate about graphics, web, games, and XR. 
       Mostly having fun with three js, Shader, Unity, Unreal, p5js.
       Studying C++, OpenGL, Computer Graphics, WebGPU, and so on.
      </p>

      <p className={containerStyles.indexBottom}>
      Recently watched 
        <a href="https://www.netflix.com/kr/title/81031737" rel="noreferrer" target="_blank">
         <span className={containerStyles.highlightSpan}>
           Connected: The Hidden Science of Everything </span>
        </a>
      , 
      read 
        <a href="https://www.goodreads.com/book/show/20518872-the-three-body-problem" rel="noreferrer" target="_blank">
        <span className={containerStyles.highlightSpan}>The Three-Body Problem</span>
        </a> by Cixin Liu
      
      , donated to
        <a href="https://www.oaktreeproject.com/" rel="noreferrer" target="_blank">
        <span className={containerStyles.highlightSpan}>Secret Angel for Zion Girl's Home</span>
      </a> 
      </p>
    </div>
  </Container>
  )
}
