<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonItem, IonLabel, IonList } from '@ionic/vue';
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="tertiary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Credits</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :scroll-y="true">
      <div>
        <ion-list :inset="true">
          <ion-item>
            All music by Glenn Webb ©2023, recorded at Utah Tech University Studios, Utah Tech University, St George, Utah May-June 2023.
          </ion-item>
          <ion-item>
            Glenn Webb: vibraphone, marimba, xylophone, timpani, drums, chimes, log drums, shakers, keyboards, percussion, producer
          </ion-item>
          <ion-item>
            Chad Roundy: acoustic guitar, electric guitar, engineer, mastering
          </ion-item>
          <ion-item>
            Robert Matheson: double bass, electric bass, engineer, mastering
          </ion-item>
          <ion-item>
            Chris Flinders: tenor sax, alto sax, bass clarinet
          </ion-item>
          <ion-item>
            Cassie Flinders: flute, alto flute, bass flute, piccolo
          </ion-item>
          <ion-item>
            Robert Schmidt: trumpet
          </ion-item>
          <ion-item>
            Ethan Allen: cello
          </ion-item>
          <ion-item>
            Kylie Hunter: violin
          </ion-item>
          <ion-item>
            Josh Gerontis: developer
          </ion-item>
          <ion-item>
            Sadie Stone: graphics
          </ion-item>
          <ion-item>
            The creation of SG Music Walk is supported by
            a grant from the St. George Arts Commision.
          </ion-item>
          <ion-item>
            Image credited to MojaveNC, CC BY 2.5 via Wikimedia Commons
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-item {
  margin: 20px 0;
}
</style>
