# SG Music Walk
A capacitor app that plays music depending on where you are.

DONE:
- app builds for web, iOS, and android
- able to get user location
- centralized map of st george using leaflet and openstreetmap
- make an interface for geoJSON to make custom zones
- basic able to detect if a location is inside of a geoJSON zone
- working audio player that is able to play audio
- draw a circle where the user is
- able to tell if given location is inside any zone and if so which one(s)
- event loop and checking location
- audio player plays correct music based on the zone
	- audio player knows how to crossfade (hopefully)
	- when not in a zone, play transition music on loop/random
	- when leaving a zone, quiet down current tracks, immediately play transition, loop transition until in new zone, when transistion done, play new zone
	- audio player picks random tracks from the folder
- constantly check if in any zone
- credits

TODO:
- manual music player
