import React, { useState } from "react"
import Header from "../components/header"
// import Container from "../components/container"
import vitaeStyles from "../components/vitae.module.css"
import VitaeKO from "./vitae_ko";
import VitaeEN from "./vitae_en";
import '../styles/global.css';

export default function Vitae() {

  const [language, setLang] = useState('ko')

  return (
    <div className={vitaeStyles.vitaeContainer}>
    <Header />
    
    <div>
    <button class={vitaeStyles.vitaeButton} onClick={() => setLang('ko')} name="change to korean">한글</button>
    <button class={vitaeStyles.vitaeButton} onClick={() => setLang('en')} name="change to english">EN</button>
    </div>

    <h1>Creative Technologist | Front End Web Developer | Artist </h1>

    <p>
      <a target="_blank" rel="noreferrer" href="https://maily.so/sosunnyproject/">뉴스레터 (Korean Newsletter)</a><br />
      <a target="_blank" rel="noreferrer" href="https://instagram.com/sosunnyproject/">Instagram</a><br />
			<a target="_blank" rel="noreferrer" href="https://www.youtube.com/artistwhocode">Youtube</a> <br />
    </p>

    <h2>Languages/Framework/Engines</h2>
    <p>
      Javascript (es6), HTML/CSS, Threejs, P5js, Processing, WebGL, Pixi JS, React JS, Webpack, Parcel, Netlify, Unity Engine, Hololens, Leap motion, Kinect, Tensorflow, Python, Java
    </p>

    {(language === 'ko') && <VitaeKO />}
    {(language === 'en') && <VitaeEN />}
    </div>

  )
}
