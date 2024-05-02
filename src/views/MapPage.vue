<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/vue';

const currentSongName = ref('Song Name');
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Now Playing <strong>{{ currentSongName }}</strong></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content scroll-y="false">
      <h1>Map Page</h1>
    </ion-content>
  </ion-page>
</template>
