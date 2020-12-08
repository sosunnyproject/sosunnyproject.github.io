
0. start from hat sample project 

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
- in patch editor, make sure you connect hat position, head occluder to each faceTracker
- in patch editor, connect each facetracker to each 3d object hat

## ref
- dan moller: https://www.youtube.com/watch?v=7i_V2K5XkUk 