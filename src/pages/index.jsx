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

      <p>
      a sassy girl loved musical theaters so much she <span role="img" aria-label="airplane">✈️</span> to New York Broadway & Vassar <span role="img" aria-label="the statue of liberty">🗽</span>
      When life was giving her <span role="img" aria-label="lemon">🍋🍋🍋</span>, she found some 💎 
      in the land of <Link to="/blog">software engineering </Link> 💻 
      Yet, as she still loves <span role="img" aria-label="arts">🎨</span> <span role="img" aria-label="theater">🎭</span> she has started <Link to="/portfolio"> combining media and technology </Link> 
      through VR, AR, mixed media, and <a target="_blank" rel="noreferrer" href="https://www.instagram.com/sosunnyproject">creative coding. </a>
      Currently in Seoul, she's a freelance front-end web developer, creative coder, and artist. Mostly having fun with p5 js, three js, matter js, Unity, Blender, shader.
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
