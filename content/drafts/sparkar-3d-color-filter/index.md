---
category: 'blog'
title: "[SPARK AR] How I Made My First Christmas Instagram Filter (2)"
date: "2020-12-11"
---

5. color lut
- used josh beckwith's fastColorLutPatch 
- canvas > rectangle 
  - above faceTrackers (order)
  - render pass: second box uncheck

6. color lut native picker ui
- https://sparkar.facebook.com/ar-studio/learn/tutorials/native-ui-picker/#the-unfinished-project

7. color filter with 3d object / face tracker
- color filter canvas (camera texture -> patch color lut -> canvas rectangle material texture)
- canvas layer order should be behind (the latter) the faceTracker's layers
- canvas - bg rectangle object's material: flat type, uncheck Use Depth Test, Write to Depth (it's going behind all the facetracker effects layer)


8. face smoothing with color lut
- face retouch layer always should be latter than facemesh (color lut)
- if you don't make faceTexture tracker's own facemesh (for color lut), your retouching facemesh under the same faceTracker doesn't appear
- facemesh color lut materials : uncheck Use Depth Test. flat Shade Type. 
- facemesh color lut objects: check eyes and mouth to remove weird lines around the eyes and mouth
- disadvantage: there is a gap between facemesh (for color lut) and the real facetexture
  - particles like snow may go throught this gap, and it looks like its cutting through your face

9. particles going through, passing through or overlapping with face mesh
- in my case, i created separate canvas, rect, and face mesh for color lut
- then, my particles were going through the spaces between facemesh(color lut) and my real face object
- i unchecked render options: depth of particles. 
- Then, it created the effect of moving all the particles to the closest layer of camera. now it doesn't overlap between
my face mesh layers. not going through eyes or mouth. 

## ref
- dan moller: https://www.youtube.com/watch?v=7i_V2K5XkUk 
- maru studio: https://www.youtube.com/watch?v=033uM62blLw
- josh beckwith: https://github.com/positlabs/spark-lut-patch 