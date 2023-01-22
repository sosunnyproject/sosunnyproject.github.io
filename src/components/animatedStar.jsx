import React, { useRef, useContext } from "react";
import puffPianoGLB from "../assets/jigglypuff_piano.glb"
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Clone, useGLTF, OrbitControls, PresentationControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export default function AnimatedPiano() {
    const myMesh = React.useRef();
    useFrame(({ clock }) => {
        myMesh.current.rotation.y = clock.getElapsedTime();
    })

    const puffPianoModel = useLoader(GLTFLoader, puffPianoGLB, 
        (loader) => {
            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath('./draco/')
            loader.setDRACOLoader(dracoLoader)
        }
      )

    return (
        <mesh ref={myMesh}>
            <primitive object={ puffPianoModel.scene } scale={ 5 } rotation-y={60} position-y={ 0.2 } position-x={ 0 } />
        </mesh>
    )
}

