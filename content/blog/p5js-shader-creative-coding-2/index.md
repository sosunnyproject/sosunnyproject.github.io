---
category: 'blog'
title: "[p5js] Studying Shader with Creative Coding (2)"
date: "2020-12-19"
---

## Shader Study with P5 Javascript Library (2): Important Shader Concepts

### Colors and Position

Colors
- RGB values range: 0 ~ 1
- For example, Blue would be (0.0, 0.0, 1.0), Orange (1.0, 0.5, 0.0)

Position
- range: 0 ~ 1
- width value is 1.0, height value is 1.0 for the shader

### GLSL Shader Language is Strongly Typed
- Always write numbers in float type. 
- Graphics cards can be picky about this.
- Define the type of all of variables: int, float, vec2, etc.

### Get Familiar with Vectors
- When we need a variable that holds more than one number, we use vec2, vec3, vec4, etc.
- vec2 holds 2 numbers, vec3 holds 3 numbers, and vec4 hold 4 numbers
- In math, vectors are used to indicate positions or directions
- In shader, vectors are also used to store colors
- We can access the numbers inside vectors by using dot. This is called Swizzling

```glsl
//define vectors
vec2 position = vec2(0.5, 0.5);
vec3 color = vec3(0.0, 0.5, 1.0);
vec4 colorWithAlpha = vec4(0.0, 0.0, 1.0, 0.5);

// Swizzling: access numbers inside vectors
float red = color.r;
float green = color.g;
float blue = color.b;
```

**Explanation of Swizzling from OpenGL wiki** 

```
Additionally, there are 3 sets of swizzle masks.
You can use xyzw, rgba (for colors), or stpq (for texture coordinates).
These three sets have no actual difference; they're just syntactic sugar. 
You cannot combine names from different sets in a single swizzle operation. 
So ".xrs" is not a valid swizzle mask.
```

### Variable Qualifiers: Const, #define, Attribute

```glsl
const float PI = 3.141592653;
// or
#define PI 3.141592653;

// vertex data aPosition from p5 webgl
attribute vec3 aPosition;

void main() {
  // copy the position data into a vec4
  // we're using 1.0 as the w component (which controls scaling/normalization of the coordinates)
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
```

### Send data from P5 js (CPU) to Shader (GPU): Uniforms

- `Uniforms` are constant variables.
- `Const` is constant per frame, so it can be updated between draw calls.
- `Uniforms` can be accessed by all of the parallel threads in our GPU.
- Each thread can read the input data but cannot modify `Uniform`.
- Most common `uniform` to pass from p5 to shaders are **time, resolution, mouse coordinates**.
- Common prefix is `u` or `u_`.

```js
theShader.setUniform("u_resolution", [width, height]);
theShader.setUniform("u_time", millis() / 1000.0); 
theShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]); // flip Y to orient properly in shader
```

```glsl
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
```

### Typically Used to Pass Texture Coordinates: Varying

- `Varying` is per-fragment / per-pixel parameter.
- `Uniform` is same for all pixels. 
- We typically use `varying` to pass texture coordinates from p5 webgl (through vertex shader) to fragment shader.
- Common prefix is `v` or `v_`.

**vertex code**
```glsl
attribute vec2 aTexCoord;  // texture coord from p5/webgl
varying vec2 vTexCoord; // create varying vector

void main() {
  vTexCoord = aTexCoord;
}

```

**fragement code**
```glsl
varying vec2 vTexCoord;  // grab var from vertex shader

void main() {
  vec2 uv = vTexCoord;  // set texture coord to uv coord
}
```

### Texture Coordinates

**What is TexCoord(texture coordinate), FragCoord(fragment coordinate)?**

```
Think about your shader as a stretchy cloth and these coord variables as a series of pins that hold the corners tight. 

Depending on the location and spacing of these pins your shader can be stretched, distorted, or duplicated in different ways.

TexCoord is calculated in the vertex and passed from the vertex to the fragment shader, and then the texture coordinates of our shader are set to be equal to TexCoord.
```

**TexCoord in .vert file**
```glsl
attribute vec2 aTexCoord;  // cpu/p5 to vert file

varying vec2 vTexCoord; // to move texcoords from vert to frag shader

void main() {
  //copy the texture coordinates
  vTexCoord = aTexCoord;
}
```

**TexCoord in .frag file**
```glsl
// receive vTexCoord from vertex shader
// ranges from 0.0 to 1.0
varying vec2 vTexCoord;

// use a value to access every pixel on the screen
vec2 st = vTexCoord;

```

### FragCoord is used in fragement shader

- Calculate the texture coordinates relative to the resolution uniform we passed it
- You may see coordinates referred as uv, st, coord, etc. These are just different naming conventions.

**FragCoord in .frag file**

```glsl
void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
 }
```

### Reference links
- https://itp-xstory.github.io/p5js-shaders/#/./docs/important-concepts
- https://itp-xstory.github.io/p5js-shaders/#/./docs/using-variable-qualifiers
- https://itp-xstory.github.io/p5js-shaders/#/./docs/using-texture-coordinates