import React from "react"
import Header from "../components/header"
// import Container from "../components/container"
import * as vitaeStyles from "../components/vitae.module.css"
import '../styles/global.css';

export default function VitaeEN() {
  return (
    <>
    <h2>Exhibitions</h2>
      <p className={vitaeStyles.title}>'Euljiro Has No Park' v.1, Seoul Foundation of Arts and Culture (SFAC) sponsored x Eulji Art Center 
      <a href="https://archivist.kr/show/scroll.php?pagecode=1638070197" rel="noreferrer" target="_blank"> “A Folding of the City" exhibition </a> </p>
      <span className={vitaeStyles.addition}>Artist</span>
      <span className={vitaeStyles.addition}>August 2021 - January 2022</span>
      <ul>
        <li> Created Interactive real-time 3D website that imagines the future of Euljiro, Seoul, inspired by SF novel ‘Folding Beijing’ written by Jingfang Ha</li> 
        <li> Developed mainly with Threejs, WebGL, Xbox Gamepad x Web API, 3D GLTF models and animation with MonsterMash.zone</li>
      </ul>

      <p className={vitaeStyles.title}>Decentralized Web of Care - 
      <a href="https://whiteblock.org/%EC%A0%84%EC%8B%9C/view/2792034" rel="noreferrer" target="_blank">GARDEN.LOCAL v.2</a>, TaeyoonChoi Studio x Whiteblock Art Center Paju</p>
      <span className={vitaeStyles.addition}>Software engineer collaborator</span>
      <span className={vitaeStyles.addition}>August 2021 - January 2022</span>
      <ul>
        <li> Developed frontend and generative designs using Pixi.js, and built accessibility feature, touch, sound interaction on mobile environment</li> 
        <li> Made Pc/Mobile websites running on Raspberry Pi mesh networks, remotely supported live exhibition emergencies</li>
      </ul>
      <p className={vitaeStyles.title}>
      <a href="https://2021frankenstein.bubbleapps.io/version-test" rel="noreferrer" target="_blank">2021 Frankenstein</a>, SFAC sponsored UNFOLD x SAPY exhibition</p>
      <span className={vitaeStyles.addition}>Artist, Team Lead, Developer</span>
      <span className={vitaeStyles.addition}>June 2021 - August 2021</span>
      <ul>
        <li>Published XR artwork on Hololens 2.0, iOS App, Android App with designers and producers, inspired by original novel ‘Frankenstein</li> 
      </ul>

      <h2>Experience</h2>

      <p className={vitaeStyles.title}>Tripbtoz, Gangnam</p>
      <span className={vitaeStyles.addition}>Frontend Developer</span>
      <span className={vitaeStyles.addition}>March 2020 - May 2021</span>
      <ul>
        <li>Built Responsive Web & Mobile webview, modulized based on atomic designs, implemented i18n multi-language support, project-managed social media sharing and B2B revenue solution porudcts</li> 
        <li>Mainly used React JS, Redux, Reselect, Webpack, Babel, Styled-components, Ant Design</li>
      </ul>
      <p className={vitaeStyles.title}>POSCO ICT R&D Center, Pangyo</p>
      <span className={vitaeStyles.addition}>AR, Blockchain, Web Developer</span>
      <span className={vitaeStyles.addition}>December 2017 - March 2020</span>
      <ul>
        <li>Made a Desktop App intergrating AR Glass, touch & voice recognition, Speech-To-Text features (Electron, React, Raspberry Pi, Python)</li> 
        <li>Architected, developed web API and smart contracts for Hyperledger and Java Backend</li>
      </ul>
      <p className={vitaeStyles.title}>Fortune Magazine, Time Inc, New York</p>
      <span className={vitaeStyles.addition}>Web Production Assistant</span>
      <span className={vitaeStyles.addition}>June 2016 - May 2017</span>
      <ul>
        <li>Produced ecommerce strategies and related articles, Proofread and published daily content on the official website</li> 
        <li>Assisted and researched monthly business franchise lists including Fortune 500, Global 500, and more</li>
      </ul>

    <h2>Education</h2>
    <p className={vitaeStyles.title}>Vassar College, Poughkeepsie, NY</p>
    <span className={vitaeStyles.addition}>Bachelor’s Degree, Cum Laude, Phi Beta Kappa</span>
    <span className={vitaeStyles.addition}>September 2012 - May 2016</span>
    <ul>
      <li>Media Studies major, Chinese minor, GPA 3.8/4.0, Cum Laude</li> 
      <li>Relevant courses: Computer Science I & II, CS III: Software Design and Implementation, Computer Organization (structure of computing systems), Computer Animation (Maya), Computer Games (Unity)</li>
    </ul>

    <p className={vitaeStyles.title}>Deep Learning Program, Computer Vision (A.I.), ModuLabs - Certified</p>
    <span className={vitaeStyles.addition}></span>
    <span className={vitaeStyles.addition}>January 2018 - December 2018</span>
    <ul>
      <li>Main curriculum: Stanford CS224n, Statistics, PyTorch, Tensorflow, Python </li> 
      <li>Team Research Paper: 'Transforming Hand-Sketched Objects into Photographic Qualities'</li>
      <li>Personal Media Art Installation: 'Let it Snow: Using Tensorflow JS Posenet' </li>
    </ul>

    <p className={vitaeStyles.title}>POSTECH Big Data / A.I. Bootcamp</p>
    <span className={vitaeStyles.addition}>Certified - Top Rank</span>
    <span className={vitaeStyles.addition}>July 2017 - November 2017</span>
    <ul>
      <li>Main curriculum: Python, Tensorflow, Linear Algebra, Data Science, Machine Learning</li> 
      <li>Led internal team projects such as Summarizing News with NLP, K-drama Data collection/analysis/visualiztion with Python Pandas</li>
    </ul>

    <h2>Talks</h2>
    <ul>
<li>2022.11   		Artist Talk, IML300: Reading and Writing the Web course by Qianqian Ye, 		USC Media Arts and Practice Division</li>

<li>2022.11 		<i>Coding Typography in 2D & 3D world</i>, Korean Society of Typography</li>

<li>2022.09 		Organizer, MC, Creative coding performer JSCONF KOREA 2022</li>

<li>2022.08 		Panel, Discussion About Translation and p5js, Women Open Tech Lab, Seoul Arts Week</li>

<li>2022.02 		Judge, Google Developer Student Clubs Korea Winter Hackathon: Play Your Stay</li>

<li>2021.08		Instagram Takeover, p5js official Instagram account</li>

<li>2021.08		Organizer, MC, and Speaker, Processing Day Seoul, Gather.Town & KOTE gallery, Seoul</li>

<li>2020.10		<i>Introducing Creative Coding Open-Source to Generate Art</i>, Samsung Open Source Conference, Seoul</li>

<li>2019.12		<i>Learn Code to Make Art</i>, Modu Conference, Modulabs, Seoul</li>

<li>2019.11		<i>Creative Coding: Code + Art</i>, Women Who Code Seoul, Microsoft Office, Seoul</li>

<li>2019.10		<i>How We Do Code x Art Lab</i>, JSCONF Korea, COEX expo center, Seoul</li>

<li>2018.12		Presentation and demo, <i>Playing with Deep Learning: Interact with PoseNet</i>, Modulabs</li>

<li>2018.10 		Poster presentation, <i>Transforming Hand-Sketched Objects into Photographic Qualities</i>,		Artificial Intelligence Symposium Conference by IEIE, Seoul National University</li>

<li>2018.06 		<i>Introduction to Blockchain</i>, Modulabs</li>
</ul>

<h2>Workshops</h2>
<ul>

<li>2022.09-11  	<i>Interactive Visual Coding</i>, 5-weeks curriculum, Notefolio Design Academy, Seoul </li>

<li>2022.02 	     	<i>Dancing Vertex – Behind the Scene</i>, Nest Gangnam, Seoul</li>

<li>2022.08		Assistant Teacher, Taeyoon Choi’s Body Coding workshop, 		Smilegate Game Company Future lab, Seoul</li>

<li>2022.07 	       	<i>Trigonometry in p5js</i>, Virtual CC Fest</li>

<li>2022.04-05   	<i>Animating Pixel Human with p5js</i>, Nest Gangnam, Seoul</li>

<li>2022.05 		Artist Talk & Workshop, Taeyoon Choi’s Creative coding workshop for 		Samsung Special Education School students, Leeum Museum, Seoul</li>

<li>2022.02 		<i>Generative Symmetric Patterns with p5js</i>, Nest Gangnam, Seoul</li>

<li>2019.07-09	<i>Draw Nature with Code, p5js</i>, a series based on Nature of Code lectures,		Modulabs</li>

<li>2016.10 		Participant and team lead, <i>Augmented Beatz</i>, Reality Virtually Hackathon, 		MIT Media Lab, Boston</li>

<li>2016.07 		Participant, Hack Cooper 2016, Cooper Union, NY</li>
</ul>
    </>

  )
}
