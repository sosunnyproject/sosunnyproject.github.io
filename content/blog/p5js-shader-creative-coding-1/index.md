---
category: 'blog'
title: "[p5js] Studying Shader with Creative Coding (1)"
date: "2020-12-18"
---

## Shader Study with ITPers Shader x P5 JS (1)

### Why Start Studying Shader?

I've been wanting to study shader since I saw a computer science course named 'computer graphics' when I was at college. I was learning Unity around that time,  so 'graphics' sounded so cool. Yet, my course schedule was already loaded and it seemed quite hard for me, who was neither majoring nor minoring CS at the time (I wish I knew this is a stupid reason though).

Later, I learned more about Unity, openframeworks, and other creative coding tools or libraries. The more I worked with images and heavy renderings, I realized how important an effective computing is. And at NYU ITP summer CAMP, I first heard about 'Book of Shaders' from Michael Simpson's class. 

It was always on my to do list. Finally, a week ago, I encountered some serious GPU / speed limitation while working on p5js WEBGL and 3D modes. Now I actually have an urge & full interest to start digging into SHADERS.

### Shader is ...

- **faster**
- [`a small program that runs entirely on your graphics card`](https://itp-xstory.github.io/p5js-shaders/#/./docs/what-are-shaders)
- operating in parallel (GPU), not in sequence (CPU)
- useful to create [`complex but performative graphics`](https://itp-xstory.github.io/p5js-shaders/#/./docs/why-use-shaders?id=performance)
- it's own script, just like soundfile or image you add
- written in GLSL (openGL Shading Language) - a low-level language, compared to Javascript(meaning it sounds more like computer language than human language)
- [composed of .vert file and .frag file](https://itp-xstory.github.io/p5js-shaders/#/./docs/how-to-write-a-shader?id=the-anatomy-of-a-shader)


### Understanding Few Terms and Concepts

- vertex
- mesh: the complex shape that connected multiple vertexes, eg. Sphere 
- gl_Positions: built_in variable used in .vert file
- gl_FragColor: built_in variable used in .frag file
- GL_ES: shader API 
- vec3 aPosition: the attribute that has 3 vectors and tells a pixel its location on the canvas
- void main() : the name of function where the program starts

### How to Use Shader with P5JS ?

1. no need to add .vert and .frag filenames on index.html. `<script>` tag can load javascript file only, so it doesn't understand shader files anyway

2. preload .vert, .frag files in `sketch.js` file like below

This is the code I got from [p5js shaders glitch example](https://glitch.com/edit/#!/normal-coord-vs-normalized?path=sketch.js%3A1%3A0)

```js
let theShader;

function preload(){
  // load the shader
  theShader = loadShader('onecolor.vert', 'onecolor.frag');
}
function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
}
function draw() {
  // shader() sets the active shader with our shader
  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0,0,width,height);
}
```
3. checkout [this built-in shader method](https://p5js.org/reference/#/p5/shader) in p5js API

### What I felt after following basic examples
- the grammar feels just like java
- excited to learn `setUniform` method which allows **User's input interactivity**

### Reference
- https://itp-xstory.github.io/p5js-shaders/#/
- https://github.com/aferriss/p5jsShaderExamples
- https://editor.p5js.org/hlp/sketches/ncJGM9DNj
- https://editor.p5js.org/hlp/sketches/FZPksI2Ii
- https://github.com/processing/p5.js/wiki/Global-and-instance-mode
- shadertoy.com 