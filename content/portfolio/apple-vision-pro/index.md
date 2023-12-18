---
title: "[AR] Apple Vision Pro x Unity Polyspatial"
date: "2023-09-31"
category: "portfolio"
subcategory: "XR"
featuredImage: "simulator-2.jpg"
---

## Build recordings
<iframe width="100%" height="640" src="https://www.youtube.com/embed/wbmUbkq4enc?si=1ZJIUhVAieRveS4W" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Highlights
- Led a 4-people team at 2-days XR Hackathon, hosted by MIT Reality Hack, sponsored by Apple, Meta, Unity, Qualcomm, Snap
- Built AR demo with Apple Vision Pro Simulator and Unity Polyspatial beta SDK to simulate sports environment for training and/or audience tools 
- Reported SDK bugs regarding Apple Vision Pro emulator graphics issues and discrepancy with the Unity editor preview to Unity Professional Services team
  - The objects implemented in Unity Editor are not occluded in Apple Vision Pro Emulator. It is because the objects are virtual, not being fed by a real camera of Apple Vision device.
  - Unity camera's setting in *screen space overlay* does not work in Apple simulator. We had to choose *screen space camera* but then it moves along the camera view and too shaky.
  - Unity only handles the game mechanics and interaction algorithms, while Apple vision pro handles all the graphics and final renderings. That is why it is hard to control the graphics problems from Unity editor side. 


<figure style="display: block; margin: 0 auto; text-align: center">
<img src="simulator-2.jpg">
<figcaption>Final rendering in first-person view</figcaption>
</figure>

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="simulator-1.jpg">
<figcaption>Build rendering in third-person view</figcaption>
</figure>

## Building a Apple Vision Pro Simulator Scene in Unity

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="unity-10.jpg">
<figcaption>Replicating one of the Apple Vision Pro sample scene: Gallery</figcaption>
</figure>

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="unity-11.jpg">
<figcaption>Customizing Character Walker scene for VisionOS</figcaption>
</figure>

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="unity-7.png">
<figcaption>Customizing Character Walker scene for VisionOS</figcaption>
</figure>


<figure style="display: block; margin: 0 auto; text-align: center">
<img src="unity-6.png">
<figcaption>Waypoint algorithm for charact walking</figcaption>
</figure>


<figure style="display: block; margin: 0 auto; text-align: center">
<img src="unity-7.png">
<figcaption>Customizing Character Walker scene for VisionOS</figcaption>
</figure>

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="unity-5.png">
<figcaption>Adding UI components in Unity for VisionOS</figcaption>
</figure>


## Unity Polyspatial Build Setup & Troubleshooting

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="unity-2.jpg">
<figcaption>Apply Vision Pro and Unity Polyspatial SDK licenses</figcaption>
</figure>

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="unity-0.jpg">
<figcaption>After you have Unity Polyspatial license, you can import plugins</figcaption>
</figure>

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="unity-1.jpg">
<figcaption>When you build, choose visionOs platform. Check xcode version if you encounter build issues later.</figcaption>
</figure>

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="unity-3.jpg">
<figcaption>Building Apple Vision Pro Sample scenes with Unity. Warning message is due to graphics rendering difference between Unity and Apple Vision Pro.</figcaption>
</figure>

<figure style="display: block; margin: 0 auto; text-align: center">
<img src="unity-4.png">
<figcaption>URP material warning in Xcode build</figcaption>
</figure>


<figure style="display: block; margin: 0 auto; text-align: center">
<img src="xcode-2.jpg">
<figcaption>If you have multiple xcode versions, make sure you select the compatible one</figcaption>
</figure>
