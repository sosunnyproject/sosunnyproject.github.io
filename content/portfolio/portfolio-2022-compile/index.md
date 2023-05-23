---
title: '[Portfolio] Summary & Index'
date: '2022-12-31'
category: 'portfolio'
featuredImage: 'thumbnail.png'
---

## INTRODUCTION
A developer and storyteller who uses interactive digital mediums. Passionate about making technology more accessible, approachable, enjoyable through creative applications.

## 1. WEB PROJECTS 웹 개발
- [Euljiro Has No Park, 2021](#web-1)
- [garden.local, distributed web of care, 2021 - 2022](#web-2)
- [Digital Trypanosomiasis, 2022](#web-3)
- [Tripbtoz, 2020 - 2021](#web-4)
- [Saving Okja, Global Jeju Hackathon, 2017](#web-5)

## 2. GENERATIVE ARTS 알고리즘 생성 아트
- [Audiovisual live-coding performance, 2022](#ga-1)
- [Creative coding classes and performances, 2022](#ga-2)
- [Dreaming in Starry Night, 2021](#ga-3)
- [Creative coding works on social media](#ga-4)

## 3. XR (AR, VR, MR) 증강현실, 가상현실
- [2021 Frankenstein, 2021](#xr-1)
- [Reviving 5 Pointz, 2017](#xr-2)

## 4. INTERACTIVE INSTALLATION 인터렉티브 설치물
- [Dance x Tech Lab,  2021](#ii-1)
- [Subconscious,  2021](#ii-2)
- [Here, Now,  2020](#ii-3)
- [Bloom Together,  2019](#ii-4)
- [Stars in Your Hands,  2017](#ii-5)
- [Interplaying, 2016](#ii-6)
- [Theater, Vassar College, 2012-2015](#ii-7)

## 5. PRESENTATION 발표
- [List of Talks](#pp-1)
- [List of Workshops](#pp-2)

<h3 id="web-1"><a target="_blank" rel="noreferrer"  href="https://sosunnyproject.github.io/portfolio/euljiro-xyz/"> 을지로에는 공원이 없다. Euljiro Has No Park, 2021</a></h3>

Topic: Urban Environment

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-1.png">
<figcaption>December 2021, Euljiro Has No Park v.1, <br /> <i>The Folding of the City</i> group exhibition, Eulji Art Center, Seoul</figcaption>
</figure>

An interactive 3D web-based artwork about the future of Euljiro district in Seoul, South Korea.

- Threejs 라이브러리를 사용해서 나무, 잔디 등 전체 환경을 구성했습니다.
- L-system 알고리즘을 응용하여 나무를 모델링하고, 중앙의 큰 생명나무의 매터리얼은 webGL 쉐이더 코드를 사용했습니다.
    - 참고: [보타니컬 알고리즘](http://algorithmicbotany.org/), [l-system 시뮬레이터](https://www.carl-olsson.com/project/l-system/)
- 캐릭터는 프로크리에이트에서 직접 드로잉한 2D 스케치를 [Monstermash.zone](Monstermash.zone) 어플리케이션으로 3D화 하고 짧은 애니메이션을 생성했습니다.
    - 캐릭터별 애니메이션은 최적화를 위해 몇몇 모델에만 적용했습니다.
- 유저의 에너지가 떨어지면 조명이 점점 어두워지고, 필터가 블러화되면서 픽셀이 깨지는 것 같은 효과를 보입니다.
- 유저는 화살표 키로 이동이 가능하며, raycast로 유저와 각 캐릭터 거리를 인지하고, 충분히 가까워지면 일종의 메시지 창을 띄웁니다.
- 현장 전시 기간 동안, [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API)를 이용해 게임패드 콘솔로 조작이 가능하게 구현했습니다. 
- webpack, vite 번들링 프레임워크로 구축했습니다. 


<h3 id="web-2"><a target="_blank" rel="noreferrer"  href="https://sosunnyproject.github.io/portfolio/dwc-v2/">garden.local, distributed web of care, 2021 - 2022</a></h3>

Topic: Nature and tech

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-2-1.jpeg">
<figcaption> <i>가든.로컬 garden.local</i> 2021, LED monitor, paintings, Raspberry Pi, <br />  Installation view, Art Center White Block, Paju</figcaption>
</figure>

A multimedia exhibition that poses a question ‘What if the Internet is like a garden?’. Logging into the mobile website via local wifi network, the audience can experience their own virtual gardens and creatures. Made with pixi js (web 2D rendering engine), WebGL, socket, node js, Raspberry PI, etc.

- 

<h3 id="web-3"><a target="_blank" rel="noreferrer"  href="https://digital-trypanosomiasis-2022.netlify.app/">디지털 수면병 Digital Trypanosomiasis, 2022</a></h3>

Topic: Healing of Trauma

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-4-1.png">
<figcaption> Digital Trypanosomiasis by Hayne Park, featured on Ars Electronica and K’ARTS Festival. </figcaption>
</figure>

Developed an interactive scroll-based website about trypanosomiasis, sleeping sickness parasite.
- 300+ 장의 사진들을 연속적으로 플레이하여 마치 GIF 애니메이션 재생 같은 작품을 보여주는 웹사이트입니다. 
- 유저가 마우스 휠을 위아래로 움직일 때만 사진들이 연속으로 재생됩니다. 
- 구간별로 사운드 효과 재생도 구현하였으나, 최종 결과물에서는 사운드를 제외했습니다. 
- 구간마다 한글 및 영어 자막을 코드로 설정했습니다.
- Netlify로 배포하였으며, 대용량 이미지 로드는 Cloudinary 서비스를 사용했습니다.

<h3 id="web-4">Tripbtoz, 2020 - 2021</h3>

Topic: Travel Tech, B2C Service <br />
Position: Full-time Front-end Web Developer

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-5-1min.png">
<figcaption> Tripbotz, travel tech startup, Pre-Series B as of Summer 2022, Seoul, South Korea.
 </figcaption>
</figure>

Built the entire website with responsive design and refactored mobile webViews. Modularized UI components based on Atomic Design System. Actively collaborated with designers and backend developers to refactor the legacy codes and improve the renderings and data flow.

<h3 id="web-5"><a target="_blank" rel="noreferrer"  href="https://sosunnyproject.github.io/portfolio/jeju-hackathon/">Saving Okja, Global Jeju Hackathon, 2017</a></h3>

Topic: Environment
<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-6.jpg">
<figcaption> October 2017, an application demo, 1st place winner in Global Jeju Hackathon, South Korea. </figcaption>
</figure>

iOS mobile application that instantly checks the environment-friendly scores of the products with image-detection or OCR


## 2. GENERATIVE ARTS

<h3 id="ga-1"><a target="_blank" rel="noreferrer"  href="https://sosunnyproject.github.io/portfolio/jsconf-korea-2022">Audiovisual live-coding performance, 2022 </a></h3>

Topic: Audiovisual
<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-7.jpg">
<figcaption> September 2022, Dancing Vertex, JSCONF KOREA 2022 Day 2 Opening show. </figcaption>
</figure>

A live-coding audiovisual performance made with p5js creative coding library and p5live website. 

<h3 id="ga-2"><a target="_blank" rel="noreferrer"  href="https://sosunnyproject.github.io/portfolio/smhs-music-coding/">Creative coding classes and performances, 2022 </a></h3>

Topic: Audiovisual

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-8.jpeg">
<figcaption>August - October 2022, An audiovisual projection design with p5js creative coding, <br /> Seoul Music High School</figcaption>
</figure>

Teach creative coding at Seoul Music High School and produce audiovisual videos for music showcase. 

<h3 id="ga-3"><a target="_blank" rel="noreferrer"  href="https://sosunnyproject.github.io/portfolio/continuous-flow-kote-gallery-seoul-insadong/">Dreaming in Starry Night, 2021</a></h3>

Topic: Creative coding

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-10.jpg">
<figcaption>May 2021, Dreaming in Starry Night, <i>Continuous Flow</i>, KOTE gallery, Seoul.
</figcaption>
</figure>

A video installation of generative kinetic typography works made with Javascript (p5js, matterjs) and WebGL, inspired by typography designs and #36DaysOfType.

<h3 id="ga-4"><a target="_blank" rel="noreferrer"  href="http://instagram.com/sosunnyproject">Creative coding works on social media</a></h3>

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-11.png">
<figcaption>Instagram @sosunnyproject, Creative technologist, Educator.
</figcaption>
</figure>

Upload daily coding sketches, experiment with creative codes, make series of sketches with themes, and actively communicate with followers through Q&A and events like p5js Instagram Takeover.

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-12.png">
<figcaption>Youtube channel @sosunnyproject, Creative technologist, Educator.
</figcaption>
</figure>

Make basic p5js tutorials in both Korean and English. Produce time-lapse videos of creative coding works.

## 3. XR (AR, VR, MR)

<h3 id="xr-1"><a target="_blank" rel="noreferrer"  href="https://sosunnyproject.github.io/portfolio/xrea2021/">2021 Frankenstein, 2021</a></h3>

Topic: Duality of technology

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-13-1.jpg">
<figcaption>2021 Frankenstein, Hololens 2.0 & AR mobile app (Android & iOS), on-site exhibition, <br /> <i>XR-SAPY</i>, Seoul Artists Platform New & Young and SFAC sponsored.
</figcaption>
</figure>

A site-specific XR artwork about reinterpreting the meanings of ‘monster’ in a techno-advanced 21st century.

We were inspired by Mary Shelley and her classic SF novel, Frankenstein. Questioning why she created a monster, we connected the imaginary creatures with the real-world exhibition space. We also designed a new ‘monster’ reflecting the modern society and technologies. 

<h3 id="xr-2"><a target="_blank" rel="noreferrer"  href="https://sosunnyproject.github.io/portfolio/5-pointz-vr/">Reviving 5 Pointz, 2017</a></h3>

Topic: Urban Environment

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-14.png">
<figcaption>January 2017, Reviving 5 Pointz, <i>TimeWave VR Festial</i> supported by Oculus and Time Inc.
</figcaption>
</figure>

A short interactive VR documentary about gentrified and now-disappeared historic American mural space 5 Pointz in New York. Made with Unity.

<h3 id="xr-3"><a target="_blank" rel="noreferrer"  href="https://sosunnyproject.github.io/portfolio/not-you-vr/">Not You, 2016</a></h3>

Topic: Gender discrimination

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-15.jpg">
<figcaption>May 2016, Not You, <i>TimeWave VR/AR Festival</i> in Hearst Tower, New York.</figcaption>
</figure>

A short interactive VR film about gender discrimination that females go through in professional workplaces. Made with Unity, GoPro 360, Gear VR.

<h3 id="xr-4"><a target="_blank" rel="noreferrer"  href="https://sosunnyproject.github.io/portfolio/hololens-hackathon/">Augmented Beatz, VR/AR Hackathon, MIT Media Lab, 2016</a></h3>

Topic: Playful technology

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-16-2.png">
<figcaption>October 2016, Augmented Beatz, 3-days MIT Media Lab VR/AR Reality Virtually Hackathon, Boston.</figcaption>
</figure>

Hololens App demo of XR DJ-ing application that imagines a AR/MR DJ equipment one can bring anywhere. 
Made with Unity and Hololens.

## 4. INTERACTIVE INSTALLATION

<h3 id="ii-1">Dance x Tech Lab, 2021</h3>

Topic: Technology and human body <br />
Position: [Collaborator] Creative Technologist.

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-17-1.jpeg">
<figcaption>August 2021, Untitled, <i>Dance X Tech Lab</i>, <br /> Korea National Contemporary Dance Company.</figcaption>
</figure>

<p></p>

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-17-2.jpeg">
<figcaption><i>Dance x Tech Lab Showcase</i> 2021, 2-channel projections, <br /> Performance View, Windmill gallery, Seoul
</figcaption>
</figure>

A choreography piece experimenting and researching the collaboration of body, dance, and technology. 
Used Touch Designer, Kinect, MonsterMash, and social media AR filters. 

<h3 id="ii-2"><a target="_blank" rel="noreferrer"  href="https://sosunnyproject.github.io/portfolio/chwihyanggwan-exhibition-seoul-hongdae/">Subconscious, 2021</a></h3>

Topic: Trauma recovery

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-18.jpg">
<figcaption>May 2021, Subconscious, Art event in Chwi Hyang culture salon venue, Seoul. </figcaption>
</figure>

An interactive media installation that allows the audience to meditate on their inner thoughts. Made with p5js and Leap motion hand detector. An extension of work below, Here, Now.

<h3 id="ii-3"><a target="_blank" rel="noreferrer"  href="https://sosunnyproject.github.io/portfolio/2020-ial-show/">Here, Now, 2020</a></h3>

Topic: Healing of trauma

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="../2020-ial-show/edit-herenow2.png">
<figcaption>July 2020, Here, Now,  <br />  Interactive Arts Lab group exhibition <i>Frames</i>, Punto Blu gallery, Seoul. </figcaption>
</figure>

A interactive installation that imitates the process of mindfulness and body scanning for meditative purpose. 
Made with p5js and Leap motion.

<h3 id="ii-4"><a target="_blank" rel="noreferrer"  href="https://sosunnyproject.github.io/portfolio/2019-ial-show/">Bloom Together,  2019</a></h3>

Topic: Social power dynamic

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="../2019-ial-show/bloom2.png">
<figcaption>March 2019, Bloom Together, <br /> Interactive Art Lab group exhibition <i>Encounter</i>, Mapo Art Center, Seoul</figcaption>
</figure>

An interactive media installation about encouraging two different people to come close and bloom the flowers together. Used p5js and poseNet deep learning.

<h3 id="ii-5"><a target="_blank" rel="noreferrer"  href="https://sosunnyproject.github.io/portfolio/nyu-itp-camp/">Stars in Your Hands,  2017</a></h3>

Topic: Social power dynamic

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="../nyu-itp-camp/nyu10.jpg">
<figcaption> June 2017, NYU ITP Summer Camp Final Showcase. </figcaption>
</figure>

An interactive installation about reversing the power dynamic between celebrities on stage vs. audience. It allows people to directly control the lighting and projection design of the space. Made with p5js, processing, Arduino, DMX lighting.

<h3 id="ii-6"><a target="_blank" rel="noreferrer"  href="https://sosunnyproject.github.io/portfolio/media-thesis-vassar">Interplaying, 2016</a></h3>

Topic: Social power dynamic

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="../media-thesis-vassar/thesis6.png">
<figcaption>May 2016, Media Studies senior thesis project showcase, <br />Vassar College Main Building, New York. </figcaption>
</figure>

An interactive media installation demo for live music events. It experiments multiple audience and artists interacting with each other and create collaborative soundscape. Made with Unity, Leap Motion.

<h3 id="ii-7">Theater, Vassar College, 2012-2015</h3>

Position: [Collaborator] Lighting designer, Sound designer, Lighting crew.

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="slide-22.png">
<figcaption>Vassar College Theater Production for plays and musicals. 
</figcaption>
</figure>

Participated in various Vassar College Drama Department shows and student theater productions such as Stockholm, Little Shop of Horrors, Company, Mayor of Baltimore, Spring Awakening, Arcadia, and Lacunae.

## 5. PRESENTATION

<h3 id="pp-1">Talks</h3>

2022.11   		Artist Talk, IML300: Reading and Writing the Web course by Qianqian Ye, 		USC Media Arts and Practice Division

2022.11 		<i>Coding Typography in 2D & 3D world</i>, Korean Society of Typography

2022.09 		Organizer, MC, Creative coding performer JSCONF KOREA 2022

2022.08 		Panel, Discussion About Translation and p5js, Women Open Tech Lab, Seoul Arts Week

2022.02 		Judge, Google Developer Student Clubs Korea Winter Hackathon: Play Your Stay

2021.08		Instagram Takeover, p5js official Instagram account

2021.08		Organizer, MC, and Speaker, Processing Day Seoul, Gather.Town & KOTE gallery, Seoul

2020.10		<i>Introducing Creative Coding Open-Source to Generate Art</i>, Samsung Open Source Conference, Seoul

2019.12		<i>Learn Code to Make Art</i>, Modu Conference, Modulabs, Seoul

2019.11		<i>Creative Coding: Code + Art</i>, Women Who Code Seoul, Microsoft Office, Seoul

2019.10		<i>How We Do Code x Art Lab</i>, JSCONF Korea, COEX expo center, Seoul

2018.12		Presentation and demo, <i>Playing with Deep Learning: Interact with PoseNet</i>, Modulabs

2018.10 		Poster presentation, <i>Transforming Hand-Sketched Objects into Photographic Qualities</i>,		Artificial Intelligence Symposium Conference by IEIE, Seoul National University

2018.06 		<i>Introduction to Blockchain</i>, Modulabs

<h3 id="pp-2">Workshops</h3>


2022.09-11  	<i>Interactive Visual Coding</i>, 5-weeks curriculum, Notefolio Design Academy, Seoul 

2022.02 	     	<i>Dancing Vertex – Behind the Scene</i>, Nest Gangnam, Seoul

2022.08		Assistant Teacher, Taeyoon Choi’s Body Coding workshop, 		Smilegate Game Company Future lab, Seoul

2022.07 	       	<i>Trigonometry in p5js</i>, Virtual CC Fest

2022.04-05   	<i>Animating Pixel Human with p5js</i>, Nest Gangnam, Seoul

2022.05 		Artist Talk & Workshop, Taeyoon Choi’s Creative coding workshop for 		Samsung Special Education School students, Leeum Museum, Seoul

2022.02 		<i>Generative Symmetric Patterns with p5js</i>, Nest Gangnam, Seoul

2019.07-09	<i>Draw Nature with Code, p5js</i>, a series based on Nature of Code lectures,		Modulabs

2016.10 		Participant and team lead, <i>Augmented Beatz</i>, Reality Virtually Hackathon, 		MIT Media Lab, Boston

2016.07 		Participant, Hack Cooper 2016, Cooper Union, NY