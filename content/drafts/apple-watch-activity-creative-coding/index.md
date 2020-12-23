---
category: 'blog'
title: "[p5js] Making Apple Watch Activity App Logo with Creative Coding"
date: "2020-03-11"
---

# Draw Apple Watch Activity App Icon With Javascript Coding

### Final code: [p5js realtime editor code](https://editor.p5js.org/sosunnyproject/sketches/hxYeOoT3a)

## file system
- index.html
- sketch.js

## javascript functions
- for loop()
- const, let 

## P5js library APIs Used in This Code
- createCanvas()
- background()
- fill()
- noStroke()
- ellipse()
- frameCount
- rotate()
- push(), pop()
- angleMode()

## Variations
- change parameters of translate()
- change noStroke(), noFill(), stroke(), fill()
- change parameters of rotate()
- change parameter `x` of ellipse()
- change parameter `y` of ellipse()
- use frameCount as any of parameters
- change parameter `size` of ellipse()

## references/links
- [apple watch activity app icon google image search](https://www.google.com/search?q=apple+watch+activity+app&rlz=1C5CHFA_enKR890KR891&sxsrf=ALeKk00TgG3xIcmMnLAikwV-gF_OclY-oQ:1606876525648&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjp-4jEoa7tAhVFQd4KHdlwC1EQ_AUoAXoECA4QAw&biw=1390&bih=766#imgrc=NH2WX9CdkfTiSM)
- [apple official youtube - introducing Activity rings](https://www.youtube.com/watch?v=LRNNh0MqQOQ)
- [apple watch review blog](https://9to5mac.com/2016/10/31/rest-days-workaround-apple-watch-activity-app/)
- [apple official website](https://support.apple.com/guide/watch/track-daily-activity-with-apple-watch-apd3bf6d85a6/watchos)
- [free online photoshop](https://www.photopea.com/)

## script

Hello everyone,
this is sunny,
Thanks for coming to my channel

Today, im going to draw the logo of one of the most popular apple watch apps.
which is activity app. 
I personally don't have apple watch, but ive been playing around with 
my coworkers' apple watches, found few interesting logos that i want to recreate.
So in this video, I'm going make the visual and motion of activity rings with p5js coding.

## why p5js library
if you're curious why i am specifically using p5js opensource javascript library, out of all the options in this world,
please check my another video explaining it. In that video, I talk about what is p5js library, why I love p5js right now, how many years ive been using it,and what you can possibly create with this adorable opensource.

## back to topic
before we tap into the details, since im the 'conclusion first plz' type, this is the final result i made. 
and with tweaking just a few numbers and letters in my code, i made different versions, too, like this.

- why i chose this
the reason why i chose activity rings is first, i liked its motions - very simple and intuitive. 
second, it seems like a good tutorial item to recreate and draw with few lines of codes. not too complicated and not too long.
third, i actually came up with this reason while coding, the colors are just so good. i spend tons of time choosing 
color schemes on pinterest, adobe colors, whatnot. and this 3 color combination, just felt so nice, for some reason. 

- step by step
alright, time to draw.
fyi, i am not going to explain how this code works fundamentally using the concept of computer and machine.  not that you need to step out just because you never coded before, i am just telling you, i might not give a full answer of 'why this works'. For example, explaining how programming fundamentally works, like hey i just typed this, what does it supposed to do with computer, what is computer doing when i click this or write that. I can try, i don't think i am a great teacher in that context at this moment. Maybe later, when i have more confidence and resource to explain those, i definitely will.

 I started from non-computer background as well, i didn't major or minor CS, i had a very hard time understanding cs beginners courses when i was in college. I understand the struggle of not entirely understanding what's going on here. But, i wanna tell you how i just started typing stuff at some point. I just treated programming as a language, and a lot of parts you write is because of grammar. You write this way, because the makers and founders of that language made rules. And if you want to make your sentence or code to sound right, then you have to speak in the language of computer. That's how i just started digging into programming, even though i didn't fully understand what is going on behind the scene, which made me super uncomfortable at that time. 

 