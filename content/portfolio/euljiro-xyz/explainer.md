

1. First Person Camera
- Perspective Camera: fov, aspect, near plane, far plane
- PointerLockControls
  - First Person Body attached to Main Camera
  - mouse: Eye Direction
  - keyboard WASD, Arrows, xboxGamepad: Walking Direction
  - Control the values of velocity, position
  - Lock / Unlock: Press ESC to Retrieve the mouse pointer
    - Used addEventListeners to check lock/unlock status
    - When locked, show UI instructions

2. Collision
- Inside tick(), keep checking if the camera's position is inside or outside of bounding boxes of several paths (zone 1, 2, 3, park)
  - tick() function is as same as Unity C# script's Update() function.
  - If the camera collides with the bounding box / walls, update the camera (aka pointerLockControls) position or velocity to offset the movement.
- Raycast
  - Shoot a ray to check the object intersecting or close enough to the camera (first person controller)
  - If the camera's ray hits the object in the scene, it shows a certain text
- Checking ZONE location
  - Using "distance squared" comparison between each ZONE's circular area and Camera position
  ```js
    // Zone 1
    const centerX1 = ZONE_POS.ONE.x
    const centerZ1 = ZONE_POS.ONE.z
    const radius1 = ZONE_RADIUS.ONE

    const dx1 = Math.abs(currentPos.x - centerX1)
    const dz1 = Math.abs(currentPos.z - centerZ1)

    let inZone1 = dx1*dx1 + dz1*dz1 <= radius1*radius1
  ```
  - Save current ZONE location data in web browser's localStorage
- Threejs API
  - Create a (invisible) mesh for bounding box or use the pre-existing mesh
  - Update World Position of Mesh
  - Compute Bounding Box of geometry data of the Mesh
  - Create a variable to save AABB bounding box of the Mesh
  - Update the AABB world position with the Mesh's world matrix.
  - https://threejs.org/docs/?q=box3#api/en/math/Box3

3. Mechanism 

- Energy Feedback System

4. Renderer
- WebGLRenderer
- Add Fog to scene
- Renderer settings: sRGBEncoding
- Nodepost Renderer Processing
  - Blur effect: mosaic pixelated effect on screen
    `blurScreen = new Nodes.BlurNode( new Nodes.ScreenNode() );`
- FPS manager

5. Shader 
- Used to decorate each ZONE's bottom circular planes and Main Tree
- cloud
- cellular noise
- coffee liquid
- fog
- glow
- metallic
- sky
- turbulence
- water

6. Nature: flower petals
- Rose Algorithm
  - smaller bezier vertex
    - https://openprocessing.org/sketch/1409491
    - https://openprocessing.org/sketch/1410080
    - https://openprocessing.org/sketch/1415793
    - https://openprocessing.org/sketch/1409489
    - https://openprocessing.org/sketch/1414163
  - longer bezierVertex: https://openprocessing.org/sketch/1416027
  - arc: https://openprocessing.org/sketch/1416020
  - bezierVertex: https://openprocessing.org/sketch/1409255

7. Nature: Animated flower petals
- Generative equation
```js
 this.n = numerator || 4;
  this.d = denominator || 7;
  this.angle = angleGap || 0.5; 
  this.k = this.n/this.d;
  this.amplitude = 30;
  this.rotationY = Math.PI/2.0;
  this.scaleNum = size;
```
- ref: https://jsfiddle.net/sosunny/fjr8s9t3/2/

8. Nature: Low Poly Trees
- color palettes for Grass and Trunk parts
```js
 const grassColors = ["rgb(227, 101, 91)", "rgb(220, 214, 247)", "rgb(217, 237, 146)", "rgb(181,228,140)", "rgb(153,217,140)", "rgb(118,200,147)", "rgb(82,182,154)", "rgb(52,160,164)"]
 const trunkColors = [ "rgb(232, 174, 183)", "rgb(115, 72, 48)", "rgb(94, 116, 127)", "rgb(197, 152, 73)", "rgb(156, 179, 128)" ]
```
- Limited range of random PI values for positions x, z
- Animate the scale of each mesh by traversing the objects in main tick() function

9. Nature: grass
- Shader
  - Material: vertex, fragment shader, double side rendering
  - Geometry: Plane
  - Mesh: Instanced Mesh


10. Main Tree: L system & Shader
- vertex shader
```
In Three.js, the vertex shader is responsible for transforming the vertices of a 3D object from their local coordinate space to the final position on the screen. This transformation involves applying a series of matrix operations to each vertex.

The reason for calculating matrices in the vertex shader is to ensure that the vertices are transformed correctly based on the current state of the scene and the camera. The matrices used in the vertex shader include:

Model Matrix (modelMatrix): This matrix represents the transformation applied to the object in its local coordinate space. It includes translations, rotations, and scaling specific to the object.

View Matrix (viewMatrix): This matrix represents the transformation applied to the camera. It positions and orients the camera in the scene, allowing for different perspectives and views.

Projection Matrix (projectionMatrix): This matrix represents the transformation applied to project the 3D scene onto a 2D screen. It accounts for perspective, field of view, and aspect ratio.

By multiplying the vertex position with these matrices in the vertex shader, the vertices are transformed from their local space to the final position in the 3D scene. This ensures that the object appears correctly in the rendered output, taking into account the camera's perspective and the projection onto the screen.
```
- fragment shader: modification of cloud, fractal shader

11. Nature: mushrooms

12. Animation
- Threejs Animation System
  - Animation Mixer
    - Include Animation Clips

- Animaiton Mixer
  - Save all animation mixer data in the global array
  - Loop and play them inside the main tick() function

- Character Assets
  - glbLoader: GLB formats
  - dracoLoader: Draco Compression

13. Language options
- Korean, English
- Save the language setting in local browser's localStorage