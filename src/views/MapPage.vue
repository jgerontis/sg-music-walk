<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/vue';
import { Geolocation } from "@capacitor/geolocation";
import L, { LeafletMouseEvent } from "leaflet";
import { pointInsideZone, Transitions, Zones }  from "@/types/zones"
import { songs } from "@/types/songs";
import { AudioQueue } from "@/types/AudioQueue";
import "leaflet/dist/leaflet.css";

const audioQueue = new AudioQueue();
const activeZone = ref("");

function crossfade(tracks: string[]) {
    const index = Math.floor(Math.random() * tracks.length);
    const track = tracks[index];
    audioQueue.crossfadeTo(songs[track])
}

function getZone(point: L.LatLng) {
    let currentZone = null;
    for (const zone of Zones) {
        if (pointInsideZone(point.lat, point.lng, zone)) {
          currentZone = zone;
          break;
        }
    }
    // console.log("current zone: ", currentZone)
    if (currentZone == null) {
        // console.log("outside zone")
        activeZone.value = "";
        crossfade(Transitions)
        return
    }
    if (currentZone.folderName != activeZone.value) {
        // console.log("inside zone: ", currentZone.folderName)
        activeZone.value = currentZone.folderName;
        crossfade(currentZone.tracks)
        return
    }
    // console.log("same zone")
}

function click(e: LeafletMouseEvent) {
    const point = e.latlng;
    // console.log(point)
    getZone(point)
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
    map.on('click', click)
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
            console.log("error getting position: ", e)
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
        getZone(latlng)
        // console.log("sleeping")
        await sleep(17000)
        // console.log("done sleeping")
    }
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="tertiary"></ion-menu-button>
        </ion-buttons>
        <ion-title color="light">Playing: <strong>{{ activeZone != "" ? activeZone : "Between Zones" }}</strong></ion-title>
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
