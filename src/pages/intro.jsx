import React, { Children, useRef, useState, useMemo } from "react";
import { Link } from "gatsby"
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, PresentationControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import Header from "../components/header"
import Container from "../components/container";
import * as containerStyles from "../components/container.module.css"
import puffPianoGLB from "../assets/jigglypuff_piano.glb"
import broadwayStarGLB from "../assets/broadway_star5mb.glb"
import AnimatedPiano from "../components/animatedStar";

// https://discourse.threejs.org/t/how-to-use-three-js-inside-gatsby/12776/2
// https://codesandbox.io/s/gatsby-react-three-fiber-8c8oo?file=/src/pages/index.js:155-200

export default function Intro({ data }) {

  const { scene } = useLoader(GLTFLoader, broadwayStarGLB, 
    (loader) => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('./draco/')
        loader.setDRACOLoader(dracoLoader)
    }
  )
  const starModel2 = useMemo(() => scene.clone(), [scene])
  const starModel3 = useMemo(() => scene.clone(), [scene])

    return (
      <Container>
        <Header />
        <div className={containerStyles.jsText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
        <div className={containerStyles.canvas}>
          <Canvas flat dpr={[1, 2]} camera={{ fov: 25, position: [0, 0, 8] }}>
          <color attach="background" args={['#e0b7ff']} />
          <OrbitControls makeDefault />
          {/* <PresentationControls global zoom={0.8} rotation={[0, -Math.PI / 4, 0]} polar={[0, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]}> */}

          <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
          <ambientLight intensity={ 0.5 } />
            <mesh position-y={ 0 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
              <planeGeometry />
              <meshStandardMaterial color="greenyellow" />
            </mesh>
            {/* <primitive object={ puffPianoModel.scene } scale={ 5 } position-y={ 0.2 } position-x={ 0 } /> */}
            {/* <primitive object={ starModel2 } scale={ 0.02 } rotation-y={120} position-x={-2} position-y={ 0.05 } /> */}
            {/* <primitive object={ starModel3 } scale={ 0.02 } rotation-y={12} position-x={2.5} position-y={ 0.05 } /> */}
            <AnimatedPiano />

            {/* </PresentationControls> */}
          </Canvas>
        </div>
      </Container>
    )
  }
