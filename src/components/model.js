import React, { useMemo } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

function Model ({ url }) {
  const [gltf, set] = React.useState()
  
  React.useMemo(() => new GLTFLoader().load(url, set), [url])

  return gltf ? <primitive scale={100} object={gltf.scene} /> : null
}

export default Model