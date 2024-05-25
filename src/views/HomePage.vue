<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonFab, IonFabButton } from '@ionic/vue';
import { play } from 'ionicons/icons';
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>SG Music Walk</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :scroll-y="false">
      <div id="content-wrapper">
        <p>
          SG Music Walk is a self-guided tour of downtown St. George.
          As you walk, you'll hear curated music for your current location.
          Most tracks have several variants, so you can walk the same route multiple times and hear something new each time.
        </p>
        <p>
          Navigate to the map to get started. Headphones are recommended for the best experience.
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
#content-wrapper {
  padding: 8px;
  height: 100%;
  background-size: cover;
  background-image: url(../assets/photos/st_george.jpg);
}
</style>
