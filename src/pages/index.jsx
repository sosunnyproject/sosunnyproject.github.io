import React from "react"
import Header from "../components/header"
import Container from "../components/container"
import containerStyles from "../components/container.module.css"
import { Link } from "gatsby"
import '../styles/global.css';
import "typeface-open-sans"
import "typeface-raleway"
import "typeface-merienda"
import "typeface-montserrat"
import "typeface-roboto"
import "typeface-bungee-shade"
import "typeface-bangers"

export default function Home({ data }) {
  return (
  <Container >
    <Header />

    <div className={containerStyles.index}>
    <h1>Write Code, Make Art</h1>

    <p>
    a sassy girl loved musical theaters so much she ✈️ to New York Broadway & Vassar 🗽
    When life was giving her 🍋🍋🍋, she found some 💎 
    in the land of <Link to="/blog">software engineering </Link> 💻 
    Yet, as she still loves 🎨 🎭 she has started <Link to="/portfolio"> combining media and technology </Link> 
    through VR, AR, mixed media, and <a target="_blank" rel="noreferrer" href="https://www.instagram.com/sosunnyproject">creative coding. </a>
     Currently in Seoul, she is a full-time frontend dev during the day and creative coder at night.
    </p>

    <p className={containerStyles.indexBottom}>
      Recently watched <span className={containerStyles.highlightSpan}>Queen's Gambit</span>, 
    read <span className={containerStyles.highlightSpan}>북저널리즘</span>
    , bought <span className={containerStyles.highlightSpan}>Chicken Breasts</span> <br />
    </p>

    </div>
  </Container>
  )
}
