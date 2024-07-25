<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/vue';
import { Geolocation } from "@capacitor/geolocation";
import L, { LeafletMouseEvent } from "leaflet";
import { pointInsideZone, TransitionZone, Zones }  from "@/types/zones"
import type { Zone } from "@/types/zones";
import { songs } from "@/types/songs";
import { AudioQueue } from "@/types/AudioQueue";

import "leaflet/dist/leaflet.css";

/**
 * ================================================================================
 * This is the main file for the map page. It is responsible for the following:
 * 1. Generating the map
 * 2. Getting the user's location
 * 3. Adding the user to the map
 * 4. Getting the zone the user is in
 * 5. Keeping track of what zone the user is in
 * 6. Telling the audio queue what folder to play
 * ================================================================================
 */

// create an audio queue
const audioQueue = new AudioQueue();
// add the event listener for when the song ends
audioQueue.addEventListener("songEnded", () => {
    // console.log("song ended")
    if (previousZone.value == null) {
        previousZone.value = TransitionZone;
    }
    crossfade(previousZone.value.tracks)
})

const previousZone = ref<Zone|null>(null);


function crossfade(tracks: string[]) {
    // console.log("crossfading to: ", tracks)
    const index = Math.floor(Math.random() * tracks.length);
    const track = tracks[index];
    audioQueue.crossfadeTo(songs[track])
}

function findZone(point: L.LatLng) {
    // console.log("previous zone: ", previousZone.value)
    // console.log("finding current zone...")
    let newZone = TransitionZone;
    for (const zone of Zones) {
        if (pointInsideZone(point.lat, point.lng, zone)) {
          newZone = zone;
          break;
        }
    }
    // console.log("new zone: ", newZone)

    // first time
    if (previousZone.value == null) {
        // console.log("first time, zone is: ", newZone)
        previousZone.value = newZone;
        crossfade(newZone.tracks)
        return
    }

    // only need to change tracks when zone changes
    if (newZone.folderName != previousZone.value.folderName) {
        // console.log("new zone: ", newZone.folderName)
        previousZone.value = newZone;
        crossfade(newZone.tracks)
    }
}

// eslint-disable-next-line no-unused-vars
function click(e: LeafletMouseEvent) {
    const point = e.latlng;
    // console.log(point)
    findZone(point)
}


function generateMap(): L.Map{
    // make a static map of st george, the user icon moves on the static map
    const options = {
        zoomControl: false,
        dragging: true,
    }
    const base_latt = 37.1015
    const base_long = -113.5784
    const map = L.map("map", options).setView([base_latt, base_long], 16);

    // add a tile layer (the visuals of the map)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxNativeZoom: 18,
        maxZoom: 20
    }).addTo(map);

    // add the zones to the map
    Zones.forEach((zone) => {
        L.geoJSON(zone, {style: zone.style}).addTo(map);
    })
    return map
}

onMounted(async () => {
    // generate the map
    const map = generateMap()
    // map.on('click', click)
    // fixes bug where map won't load well
    window.dispatchEvent(new Event('resize'));
    let position, user_latt, user_long, user_radius, circle;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // get the location
        // console.log("getting position")
        try {
            position = await Geolocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0, // never change this
            })
        } catch (e) {
            // console.log("error getting position: ", e)
            continue
        }
        // console.log("position: ", position)

        // remove the old user
        if (circle) {
            circle.remove()
        }

        // add the user to the map
        user_latt = position.coords.latitude
        user_long = position.coords.longitude
        user_radius = position.coords.accuracy
        circle = L.circle([user_latt, user_long], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: (user_radius / 2)
        })
        circle.addTo(map);
        const latlng = L.latLng(user_latt, user_long)
        map.flyTo(latlng, 17)
        // console.log("getting zone")
        findZone(latlng)
        // console.log("sleeping")
        await sleep(13000)
        // console.log("done sleeping")
    }
});

onUnmounted(async () => {
    audioQueue.stop()
})

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="tertiary"></ion-menu-button>
        </ion-buttons>
        <ion-title color="light">Playing: <strong>{{ previousZone?.folderName != "" ? previousZone?.folderName : "Between Zones" }}</strong></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :scroll-y="false">
      <div id="map"></div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
#map {
  display: block;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
