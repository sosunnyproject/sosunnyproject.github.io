---
category: 'blog'
title: "[p5js] SketchRNN with Javascript (feat. ml5js)"
date: '2020-03-31'
---

## 0. template 코드
- [p5 온라인 에디터](https://editor.p5js.org/sosunnyproject/sketches/7paSvQE8N)
- [완성 코드](https://editor.p5js.org/sosunnyproject/sketches/TE0MLII9O)

## 1. index.html 에 src 추가하기
- [Your index.html](https://learn.ml5js.org/docs/#/tutorials/hello-ml5?id=code)

```html
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://unpkg.com/ml5@0.4.3/dist/ml5.min.js"></script>
  <!-- p5 script src -->
</head>
<body></body>
</html>
```

## 2. QuickStart

- 모델을 preload하기 때문에 callback 파라미터는 필요 없다.
- models 변수 대신에 특정 스트링 배열로 어떤 모델을 호출할지 정한다. 
    - [available models](https://github.com/ml5js/ml5-library/blob/master/src/SketchRNN/models.js)

```js
let sketchRNN;

function preload(){
  sketchRNN = ml5.sketchRNN('cat'); 
}

function setup() {
  createCanvas(400, 400);
  console.log('model loaded');
}

function draw() {
  background(220);
}
```

## 3. gotStrokePath() 메소드

- 코드

```js
// 글로벌에 추가
function gotStrokePath(error, strokePath) {
   console.log(strokePath); 
}
```

- 결과값

```json
Object {dx: -7.009424007547129, dy: -2.5481305925730413, pen: "down"}
dx: -7.009424007547129
dy: -2.5481305925730413
pen: "down"
```

## 4. initial stroke, many strokes

```js
let sketchRNN;
let currentStroke;
let x, y;

// preload function

function setup() {
  createCanvas(400, 400);
  sketchRNN.generate(gotStrokePath);
  x = width/2;
  y = height/2;
  console.log('model loaded');
}

// gotStrokePath function

function draw() {
  background(220);
  
  if (currentStroke) {
    stroke(0);
    strokeWeight(4);
    // 1. initial stroke
    line(x, y, x+ currentStroke.dx, y + currentStroke.dy); 

    // 3. start currentStroke at latest point
    x += currentStroke.dx;
    y += currentStroke.dy;

    // 2. stroke loop
    currentStroke=null;
    sketchRNN.generate(gotStrokePath);
  }
}
```

## 5. pen 의 상태

- 'down' : 그리는 중
- 'end': 끝남

```js
// 전역 변수
let nextPen = 'down';

function draw(){
 //...
  if (nextPen == 'end') {
    noLoop();
    return;
  }
  if (nextPen == 'down') {
    line(x, y, x+ currentStroke.dx, y + currentStroke.dy); 
  }
  x += currentStroke.dx;
  y += currentStroke.dy;
  
  nextPen = currentStroke.pen;
    
}
```

## 6. 내 스케치와 SketchRNN 구분하기

```js
// 전역 변수
let seedPath = [];         // 사람이 그린 stroke 저장
let personDrawing = false;

// 사람이 그리는 상태
function startDrawing() {
  console.log("person is drawing");
  personDrawing = true;
  x = mouseX;
  y = mouseY;
}

// 모델이 그리는 상태
function sketchRNNStart(){
  console.log("model is drawing");
  personDrawing = false;
  sketchRNN.generate(gotStrokePath);
}

function setup(){
  let canvas = createCanvas(400, 400);
  canvas.mousePressed(startDrawing);
  canvas.mouseReleased(sketchRNNStart);
  // ...
}

function draw(){
  stroke(0);
  strokeWeight(4);
  
  if (personDrawing) {
    let strokePath = {
      dx: mouseX - pmouseX,
      dy: mouseY - pmouseY,
      pen: 'down'
    }
    line(x, y, x + strokePath.dx, y + strokePath.dy);
    x += strokePath.dx;
    y += strokePath.dy;
    
    seedPath.push(strokePath);
  }
}
```

## 7. 내가 그린 것을 읽고, 그 이후의 stroke 를 그리도록 하기

- seedPath 데이터를 알려줘야 함
- sketchRNN.generate(gotStrokePath);
  - generate 함수는 기존의 stroke 데이터를 변수로 받을 수 있다.

```js
// 모델이 그리는 상태
function sketchRNNStart() {
  console.log("model is drawing");
  personDrawing = false;
  sketchRNN.generate(seedPath, gotStrokePath);
}
```

## 8. RDP Line Simplification 알고리즘과 결합

- [RDP points](https://www.youtube.com/watch?v=nSYw9GrakjY)
- rdp.js 파일 만들기, index.html 에서 import 하기
