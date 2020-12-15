---
category: 'blog'
title: "[p5js] Nature of Code - Vectors (feat. Coding Train)"
date: '2020-04-25'
---

# 1.1 Bouncing ball with no vectors

벡터 클래스 이용 없이 위치, 속력 이동 계산.

```js
let x = 100; 
let y = 100;
let xspeed = 1;
let yspeed = 3.3;

function setup(){
  createCanvas(300, 300);
  background(255);
}

function draw(){
  background(255);

  x += xspeed;
  y += yspeed;

  if((x > width) || (x < 0)){
    xspeed = xspeed * -1;
  } 
  if((y > height) || (y < 0)){
    yspeed = yspeed * -1;
  }

  stroke(0);
  fill(175);
  ellipse(x, y, 20, 20);
}
```

## physics variables
- location
- speed
- acceleration
- target location
- wind
- friction

# 1.2 Vectors for Processing Programmers
- new location = velocity applied to current location
- location, velocity
- [p5.Vector 클래스 활용](https://p5js.org/reference/#/p5.Vector)
  - components of vector: x, y, z
  - magnitude: mag()
  - direction: heading()
  - vector 계산용 math API 따로 있음. 단순 +, -, * 연산 불가

```js
let loc;
let vel;
let r = 20;

function setup(){
  createCanvas(300, 300);
  background(255);
  loc = createVector(100, 100);  
  vel= createVector(1, 3.3);
}

function draw(){
  background(255);

  loc = loc.add(vel);
  if((loc.x > width) || (loc.x < 0)){
    vel.x = vel.x * -1; // 벡터 연산이 아님
  }
  if((loc.y > height) || (loc.y < 0)){
    vel.y = vel.y * -1;
  }

  stroke(0);
  fill(175);
  ellipse(loc.x, loc.y, r, r);
}
```

# 1.3 Vector Addition 

- exercise 1.1: separate x, y variables --> use p5.Vector class
- exercise 1.2: walker example from introduction and convert it to use PVectors
  - [practice](https://editor.p5js.org/sosunnyproject/sketches/LdMuFLOKh)
- exercise 1.3: Extend bouncing ball with vectors example into 3D. Make sphere to bounce around a box 
  - [3d + lighting + bouncing ball](https://editor.p5js.org/sosunnyproject/sketches/xvXto_pKO)
  - [lighting 3d tutorial](https://www.notion.so/Light-in-P5-90f4a5b4d66b4a97ad0c71bea4c9f59b)


# 1.4 Vector Sub / Calculations

- mouseX, mouseY  - centerX, centerY

- [practice](https://editor.p5js.org/sosunnyproject/sketches/PnkaEedJi)
- 기존 예제: mouseX, mouseY 활용한 벡터
- 응용 코드: 끝점 - 시작점의 벡터라인이 알아서 원을 그리게끔 변경
  - end 라는 벡터값의 x, y : degress 모드
    - angle 변수가 계속 0 ~ 360 을 유지하면서 변경되는 값이도록 설정
    - slider, val : 슬라이더 값을 곱함으로써, 항상 중앙좌표점에서 시작하는게 아니라, 변동이 되도록 ..
    - rOff : 
    - 곱한 1000 값은 벡터 선의 길이

```js
let mouseVec, center, angle;
let x, y, slider;
let rOff = 0.0;

function setup() {
  createCanvas(400, 400);
  slider = createSlider(0.25, 5, 1.0, 0.25);
}

function draw() {
  background(0, 10);
  let val = slider.value();
  angle = frameCount%360;
  rOff += 0.5;

  // mouseVec = createVector(mouseX, mouseY);
  end = createVector(1000*sin(angle*val), 1000*cos(angle*val));  
  // val 곱하면, 슬라이더 값에 따라서 translate 좌표로부터 변이가 생김.

  center = createVector(width/2, height/2);
  
  // mouseVec.sub(center); // 마우스 지점이 벡터 라인의 끝점
  end.sub(center);  // end 벡터 라인에서 화면 중앙 좌표점 뺀 값의 벡터 

  // translate(width/2, height/2); // 벡터가 계속 중앙좌표점에서 시작
  translate(width/2+sin(angle)*(rOff % 200), height/2+cos(angle)*(rOff % 200));
  // 벡터의 시작점이 점점 중앙에서 멀어지면서 sin, cos 원리대로 원을 그림. rOff % 200 을 함으로써 시작점이 0~200 을 계속 반복하도록, 캔버스에서 아예 벗어나지 않도록 함.

  // 이하 생략
```