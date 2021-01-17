

## setup(), draw()

When you go to the website editor.p5js.org. this screen and code is the very first thing you’re gonna see. Here, you can see that function setup() and function draw() are already written for you, which means these are the basic functions you’d like to know when you start coding with p5js. 

FYI, editor.p5js.org is an online real-time code editor for p5js library. You don’t need to download or install anything, which is so convenient. Just start off writing code here and you will see the outcome right away in this preview window next to the code. 

Before we start off learning how to code Apple Activity logo, Let’s search these function names. because first their website is amazing. And second, more importantly, I think it’s always the best practice to look up the official documentation when you learn new stuff, especially in programming. 

This is the official website and they provide English, Spanish, Chinese, and Korean versions. Here on the left, you will see these categories. Since we want to look up functions, we are going to click Reference tab. 

Now here we see a lot of stuff. just a quick tip for beginners, if you see this parenthesis after a word, that means this is a function provided by p5js. 


Setup function
Now the good thing about p5js reference website, most of the times they give short example with descriptions. 
Let’s read the description first. 
The important thing we need to remember here is the setup function is called once when the program starts. Only once. And you can set initial properties of canvas such as size and background. You can also do many other stuff, but just be aware that what you put inside the setup function, it’s gonna run only once.

Instead of playing with this example now, i wanna show you draw function first. Then we can see what the difference is between two functions more clearly.

Draw function

Here, I wanna emphasize two things. First, the draw() functions are called after setup() and second, it runs continuously. 
From what I remember it runs almost every second or every 100 milliseconds. 
I will print the console to show you how many times it renders. I think that’s definitely more than one time per second. Probably something between 10 and 100 miliseconds?

Let’s come back to the code example. 
I wanna initialize my background color as green, so I will write that down in setup function.
If we run this code, we see this beautiful bright green color. 

Now I want to write exactly same function in draw(), but with different numbers.
I want to make it blue. 

Here, I am writing the color values with Rgb, which ranges from 0 to 255. 
—

Do you see that there’s no longer green background. It probably rendered green first, but then
Draw function just overrode it with blue color. And since setup is called once, it no longer has a chance
To bring the green color back. 

One more example, 
You see this line moving here. This is because we wrote line function inside draw(). 
Now we see that setup function initialized frameRate as 30. This means that 30 frames are rendered in a second.
When I change it to 10, it gets slower. 
When I change it to 60, it gets faster.
I’m going to write frameRate(60) in setup, and frameRate(10) in draw. 
Setup initialized frame speed to be fast, but because we overrode it in draw function, frameRate is now set to 10, which is much slower. 

Just One more thing,  there was sth called nholoop in description. I don’t use this too often. 
But it could be helpful to some people. Let’s write this nholoop at the end of draw function
To see if it really stops the program.

Just as a Side note, If you’re interested in changing how fast this canvas gets rendered or the control its speed, please go look up frameRate or frameCount functions,

## Draw one circle
- CreateCanvas()
- Background()
- Fill(), noFill()
- stroke, noStroke()
- Ellipse()

1. Now let’s actually start drawing to make Apple Watch Activity App’s logo. 

In set up function, let’s initialize our canvas size. 
I’m going to start with 400x 400 pixel size,
But If you want to make it bigger, you can obviously assign bigger numbers like 600 or 800, as you wish. 

In draw function, 
Let’s set the color of background as black.
You can write as 0, 0, 0 as in r g b values are all 0. But if you setting the color within the spectrum of black and white, you can just write single number as a parameter of this function. 
To make it clear, let’s look up background() function in reference page. 

(Read description) Which means if you don’t write this background() directly, then your canvas color will be transparent. 
As I just mentioned, you can put either 3 numbers or 1 number or something else. And you might ask, how do I know this? Because they also explain syntax and parameters of the functions! There is no way someone can just instantly know how to use functions of any programming languages. Almost all coders would look up the api documentation to learn how to use and write a function. So don’t get intimidated even though you feel like you know nothing. Because that is so natural. It’s just as same as I would not know how to say or what to say if someone suddenly asks me to speak and write in …eh… French, which I never learned in my life. 

Anyways, here we see this explanation of syntax and parameters.
Syntax shows us the different ways to write background function. There could be one, two, three or four parameters. As long as you follow this number and the type of parameter you are writing, the program will understand what you want to do. 

Let’s look at this 4 parameters case. This bracket means optional. So you may write 3 parameters or 4 parameters. types of V1 v2 v3 params is a number. And a , alpha value, or opacity is number too. If you want to make it gray color - between black or white, use background function in this way. Gray parameter is also a number value. You can also write color string which is hex code like this. 
Always refer to code example when you feel lost. 


2. Now we want to draw circles. Let’s start with drawing a one circle.

Again, let’s see reference page to learn how to use this ellipse() function.
It says I would need 3, 4, or 5 parameters. I’m gonna ignore detail parameter for now. 
Following this explanation, Im writing x coordinate value as my first parameter, y coordinate the second, and then width , height values.  One thing to be careful here is that, width height values are not radius, but diameter. 

Now we have one circle. 

Hmm it’s black and white now, but what we are making is much more colorful than this. 
Let’s give a color to this circle. 
First, im going to fill the color of this shape.
Fill() seems quite similar to background function
Im going to give hex code value that I extracted from the image of activity app logo.
Instead of using 3 rgb values, here I wrote a string, which would be this case in the syntax.

And stroke() function allows you to change the outline color of a shape. 
I don’t think I need this. But if I don’t write anything, it automatically give a default stroke color
To my circle. I don’t want that. so im using this function called noStroke().

In addition, let’s try changing the parameters of ellipse function
And see what we get. 
When changing x or y coordinates, just be aware that you might wanna
Write the number that is less than width or height value of canvas size, 
Which is 400 pixel in this case.
If you change the width or height values of ellipse function, you can get
Oval shape, bigger circle, or smaller circle. 
This is a little more advanced example, if you don’t know what’s happening 
Don’t worry we will cover this later. 
If you feel like you wanna play around like this right now, go search mouseX and mouseY in reference page.
I will show you a quick example of playing around with 
Fill, noFill, stroke, noStroke functions. Please go ahead and change yours too!

## Draw 3 circles with for loop in p5js

- Colors array
- For loop
- Ellipse parameter x: why size*I, size + size* I 

Before we start, if you are completely new to programming, 
I highly recommend you to go search these terms, variable, for loop, and array of javascript.
Google would throw you thousands of websites and blogs, and im sure they are amazing, 
But I would personally recommend khan academy or codecademy. 

1. Very first step to understand this code is making an array called colors. 
Array is one of data types in computer science and it is a list-like object. In most programming languages, we call the order of array as index, which means we access each element in the array by calling the index of that element. And the index of array starts with number 0.
So we can use this first element by calling colors[0], colors[1], colors[2].

2. Next step is for loop, which is very important programming logic you’d get used to, especially when you want to repeat certain actions. In this case, our repetitive action is drawing multiple circles. 

Just like its name, we may understand this for loop as in,  execute this code inside the bracket over and over again, ‘for’ a certain number of times. 
And we define this ‘certain number of times’ and conditions of for loop inside this parenthesis, written right next to the word for.

Inside parenthesis, there are 3 crucial information divided by semicolon.
Here the first part is initialization. We initialize the starting index of this for loop. 
You can start from 0, or 1, or 10. Whatever you want.
Next part is condition. 
Repeat this code over and over , but we also wanna make it stop at some point. Otherwise your computer would get overwhelmed of infinite work. 
This code Block will get executed as long as this condition stays true. 

Last part is incrementing or decreasing the index of for loop.
- ++ means +1
- — means -1
If you wanna increment by adding 2 you would write like this I+=2 which means I = I+2
Decrement by subtracting 3, you’d write I -= 3 , I = I-3

Here, I started the index of for loop with 0, because I wanna use this index value 
To access each color in my colors array, which start from 0 index. 

And since I only want 3 circles, which is as same as the numbers of elements in my colors array, 
I set my condition to 3. I declared this variable called Len as 3, and using it here. 
But more common practice would be writing colors.length which is 3. 
Just a quick tip is, don’t get confused with your index of array and the length of array. 
Length of array means how many elements are there in your array.
But index starts from 0, so your array’s last index would always be different from the length of array.

If you’re little confused with how for loop, I highly recommend you to look up khan academy or codecademy. 

Let’s lay out how this for loop works here to clarify for all of you. 
- This index starts from 0. 
- We set the color as colors[0], and draw ellipse.
- At the end of code execution, I gets incremented by 1.

And now our index is updated is to 1.
Checking condition, this I is still smaller than 3., so we are not stopping. 
After this code execution, I gets incremented. 

And now our I is updated is to 2.
Checking condition, I is smaller than 3
After this code execution, it is incremented, and now 3. 

This I variable is 3, so this condition is false, so we are stopping the loop. 

Before we end this section, 
One more thing we need to pay attention to. 
Do you see the first parameter of my ellipse function?

It’s not 0, but size*I .
Because of this, our circles are not overlapped to each other, and rather
Beautifully aligned like this. 

This is because the value of size*I generates 
different x coordinate for each circle.

The size variable is defined at the top of this code. And im using it 
As width and height diameter of ellipse. 

Quick reminder, ellipse function’s parameters are x, y, width, height values.
If you don’t remember it, 
Please refer to my previous tutorial or p5js official reference page.

In this for loop, 
I gets updated from 0 to 1 and then 2.

So this first circle’s x coordinate is size* 0 , which is 0.
Second circle: size * I = 50 * 1 . 
Last circle is size 50 * I 2.= 100.
If we make x coordinate something bigger than a diameter of circle, 
Let’s say give width height values as 50
But change the multiplier of x coordinate as 55, 60
The circles would have some gap between one another.
If we make 45 30, something less than diameter, they would be overlapped.
 
You can move these circles by changing the x and y coordinate values
Of this ellipse function, 

But that’s not the only way,
I used translate() function in my Activity App Logo creative coding challenge,
And I will explain it further in the next tutorial video.

```js
// Size + size * I 
ellipse(size * I, 0, size, size)
ellipse(size + size * I, 0, size, size)
```
Last but not least, In my final code, 
There is one little difference in ellipse function’s first parameter, which is x coordinate of circle.
Final version’s x coordinate is size + size * I variable.
Now if I don’t add this size variable, as you can see ,
The first circle is at the center of canvas, and we cannot see
It rotating around like other ones.
In order to give some empty space in the very center of these spirals,  
just like activity app’s logo, we are adding size variable.
Also, as I explained few minutes, the first circle of which I value is 0.
If we don’t add size variable, then the first blue circle’s coordinate will be 0.
But as soon as we add this size variable, now it is little apart from the center of this canvas.
You may better understand this after you learn the translate function in my next video.

## Move circles, Rotate Circles: Spiral Animation
1. translate() method

Now we know how to draw 3 circles with for loop.
Final step is giving some life to these circles, which means make a motion
Or animation of shapes. After that, it would almost look like motion graphics.

As I mentioned in the previous section, you can move these circles
By using the function called translate. 

Let’s see what happens first when we write translate vs when we don’t write translate

If you’re already familiar with html canvas, you might have heard of this method. If you haven’t yet, that’s totally fine, im just giving out extra information cuz at some point I do wanna deep dive into html canvas and vanilla javascript, because ultimately that is what p5js library is controlling behind the screen. 

Let’s go back to Reference page, and read the description of translate function.

To make sure we’re on the same page, the coordinate of p5js canvas looks like this. Fyi, This coordinate system is same with html canvas.
Left corner is 0, 0. X gets bigger as you go right.
Y gets bigger as you go down. When we draw a shape or do sth with coordinates, the default position is 0, 0.

This section, y has minus value, and this section, x has minus value.
When you start doing webgl, or 3d environment in p5js, this coordinate system will get changed, so just be aware of that. 

1. First example code
Let’s comment this out and see what we get. our rectangle function’s x y coordinate values are 0, and our default coordinate starts from 0, 0. So this is where rectangle belongs.
But when we use translate function. Tada. Even though 0, 0 parameter values are still same in rectangle function, the shape is no longer at 0, 0.
It’s because (move to online painter)
The coordinate of this canvas is now moved to here. because of translate function, this point 30, 20 is now 0, 0 of this canvas system.

Let’s look at 2nd example. This shows what description explained about transformations being cumulative.
So there is two translate functions. 
Let me draw this. 
First translate function moved the coordinate system to here. 
And now, in this world, 0, 0 is here. 
So this second translate function moves the canvas based on current 0, 0 which is here. 
After the second translate, our coordinate system is located like this.

if you wanna draw rectangle up here Or here, you’d have to use minus values. 

Now the last example, this is gonna be difficult and interesting, also THIS would be a good example to understand dynamic motions. In my final  code, I used rotate function to make the rotate the circles, but this is another possibility you can play around with.

Width, height variables are  system variables or reserved variables in p5js world. 
Just like frameCount, you don’t need to declare or define system variables like width and height. These are just given, and p5js already knows what to return when you use these.

Here, we created the canvas size of 400 px by 400 px. 
Now p5js instantly understands this, and assign each 400 to properties called width and height.

As the description says, if we don’t use createCanvas to set our canvas size, it will make the canvas default as 100px, 100px. So console.log prints out width and height as 100.

To get the center of canvas, write width/2, height/2

And next part,
I am going to skip details for now, because it contains too many new things we have to learn. 
But if you wanna take a deep dive, please remember that this 
p5.Vector is a class, 
You can use this fromAngle function along with p5.Vector, 
And this returns a vector which is a object that holds x and y coordinate values. 
Just like you see in this console.log

Here, the rectangle is moving, because millis() function returns a current milliseconds value, which obviously changes every miliseconds. 


Since this canvas’s coordinate is once moved to the center of canvas, It makes sense that this changing x coordinate value allows the rectangle to move around the center.

If you change this denominator to 500, it renders fast, 
If we change the y coordinate, 40 to sth else, it gets closer to or farther from our 0, 0 coordinate, which is again translated to the center of canvas

2. Push() pop() 
Next, we’re gonna learn push and pop
If you paid close attention to the description of translate function, you’d notice it mentioning them in the bottom.

Let’s see what happens first when we write push pop vs when we don’t write them.

Push functions saves the current settings and transformations, while pop restores, basically resets these settings. They are always used together. 
Right after push, You can change the style and transformation settings of the canvas, and after pop, you return to previous version of your canvas.

When I first saw these, I didn’t entirely know how to play with this. But certain computer science knowledge that I had back in my college years was pretty useful. let me share just in case it helps you too.

When you learn data structure or browser rendering, you will probably hear this concept called stack. 

What I’m gonna explain now would be similar to browser’s call stack. 
If you are not aware of any of those, don’t worry, Im not gonna go too deep. 
If you want to research more by yourself, I recommend you to search in these keywords: javascript call stack, javascript event loop, and push pop stack javascript
But this image will help you to visualize what’s happening behind the screen.

To apply this image to our case, I will make some specific analogy. 

Let’s say this empty stack is our browser’s to do list, which renders and draws a canvas.
This blue square is certain action that p5js asks the browser to execute, for example fill the color or draw a circle.

When the function push runs, this part of code, goes into the stacks of browser’s to do list. 
When the function pop runs, this action gets finished and no longer valid.

Let’s look at the first example. 
The circle in the middle is colored but not the others.
We could write noFill, fill, then noFill again.

But instead, we can simply use push and pop. 
Inside push and pop, it described how to draw the circle in the middle. 
Giving thick stroke lines, fill the color, move the coordinate, draw an ellipse
And then pop makes all those drawing requests to disappear.

After pop, it draws third ellipse, but all the settings of second ellipse, 
which was inside push and pop function, disappeared.

Because code between push/pop is basically popped out of to do list, so the browser doesn’t execute that anymore.

3. rotate() 

ROTATE

Next is rotate, because in this tutorial, we ultimately want these circles to actually move and generate spiral animation.

Let’s see what happens first when we write rotate vs when we don’t write rotate.
Also, I will show you how canvas changes when rotate function is inside or outside of push/pop.

There is a subtle different when we write rotate outside and inside of push/pop.
Rotate function is giving the angle value to the canvas to rotate the circles.
If we write rotate function outside of push pop, the rotation angle value gets accumulated and applied to all shapes.
Just like it says on the official documentation.
So it seems little bit faster.

But if we write it inside push/pop, rotation angle gets reset after each for loop of drawing a circle.

Also, when you move around rotate function based on my code, be aware that I variable is no longer defined outside of for loop, so you have to change the parameter value of rotate function.

In addition, we need to pay close attention to translate function as well when we use rotate function.
Because the shapes are always rotated around their relative position to the origin. 
And translate function sets the new origin you want. S
o if you don’t explicitly call translate function, the canvas would rotate the shape around the 0, 0 coordinate which is the default origin  of canvas.

Rotate function rotates a shape by amount specified by the angle parameter,
Based on the setting angleMode, this amount unit gets calculated differently.

Default mode of p5js is RADIANS. 
By using function called angleMode, you can set the angle type of your
Canvas to eatery RADIANS or DEGREES in p5js environment.
There are lots of system variables and functions related to this, 
So please look up these in the reference page.

Just a quick note, you’d commonly put values like 60, 90, 180, 360 for degrees setting. And PI, PI/3, TWO PI for RADIANS mode.

4. Background opacity control

Last but not least, changing the opacity of background.

Here, I initially gave only one parameter to the background which generates
Gray value, between black and white. 
If I give second parameter, the background function’s syntax understands that
I wanna pass in opacity value.
Opacity or alpha value ranged from 0 to 255.
And the more I make the background of canvas transparent, 
you see more traces of rotating circles.

This is because  whenever a draw function runs,
 the background  function, which we wrote as a very first line of draw function, 
gets executed.
This means that Background function paints the entire canvas. it basically erases all the circles
Every certain milliseconds.
Therefore, if we make that background color quite transparent, we can still see the previous circles 
That previous draw functions drew on the canvas.
