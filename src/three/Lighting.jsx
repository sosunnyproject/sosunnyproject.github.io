export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[5, 12, 6]}
        intensity={2.2}
        color="#ffd9a0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={40}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={20}
        shadow-camera-bottom={-5}
      />
      <hemisphereLight args={['#bfe3ff', '#8a6a4a', 0.4]} />
    </>
  )
}
