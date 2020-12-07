

1. santa hat 3d object 
- bought from sketch fab
- facetracker: hat sample project
  - 3d obj to dragHere
  - don't touch occluder

2. face smooth skin 
- inside faceTracker, order at bottom
- layer of the very last order
- facemesh - material - retouching texture

3. particles
- emitter bg
- emitter face

4. create multiple faceTrackers
- duplicate facetracker
  - delete emitter face of second tracker
- https://sparkar.facebook.com/ar-studio/learn/articles/people-tracking/tracking-more-than-one-face/#adding-more-face-trackers

5. color lut
- used josh beckwith's fastColorLutPatch 
- canvas > rectangle 
  - above faceTrackers (order)
  - render pass: second box uncheck

6. color lut native picker ui
- https://sparkar.facebook.com/ar-studio/learn/tutorials/native-ui-picker/#the-unfinished-project

## ref
- dan moller: https://www.youtube.com/watch?v=7i_V2K5XkUk 
- maru studio: https://www.youtube.com/watch?v=033uM62blLw
- josh beckwith: https://github.com/positlabs/spark-lut-patch 