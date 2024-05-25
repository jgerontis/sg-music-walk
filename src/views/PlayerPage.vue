<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonButton, IonIcon, IonRange } from '@ionic/vue';
import { play as playIcon, pause as pauseIcon, stop as stopIcon} from 'ionicons/icons';
import { Howl } from 'howler';

// Data
const isPlaying = ref(false);
const progress = ref(0);
const duration = ref(0);
const currentTrack = ref({
  title: 'Sample Track',
  artist: 'Sample Artist',
  cover: 'path/to/cover.jpg',
  src: 'path/to/music.mp3',
});
const sound = ref<Howl>();

// Methods
const initializePlayer = () => {
  sound.value = new Howl({
    src: [currentTrack.value.src],
    html5: true,
    onplay: () => {
      isPlaying.value = true;
      duration.value = sound.value?.duration() || 0;
      requestAnimationFrame(updateProgress);
    },
    onend: () => {
      isPlaying.value = false;
    },
    onpause: () => {
      isPlaying.value = false;
    },
    onstop: () => {
      isPlaying.value = false;
      progress.value = 0;
    },
  });
};

const playPause = () => {
  if (isPlaying.value) {
    sound.value?.pause();
  } else {
    sound.value?.play();
  }
};

const stop = () => {
  sound.value?.stop();
};

const seek = (event: any) => {
  if (sound.value?.playing()) {
    sound.value.seek(event.target.value);
  }
};

const updateProgress = () => {
  if (sound.value?.playing()) {
    progress.value = sound.value.seek();
    requestAnimationFrame(updateProgress);
  }
};

onMounted(() => {
  initializePlayer();
});
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Music Player</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        <div class="music-player">
        <img :src="currentTrack.cover" alt="Album cover" class="album-cover" />
        <h2>{{ currentTrack.title }}</h2>
        <h3>{{ currentTrack.artist }}</h3>

        <ion-buttons class="player-controls">
          <ion-button @click="playPause">
            <ion-icon :icon="isPlaying ? pauseIcon : playIcon"></ion-icon>
          </ion-button>
          <ion-button @click="stop">
            <ion-icon :icon="stopIcon"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-range v-model="progress" @ionChange="seek" :min="0" :max="duration"></ion-range>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.music-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.album-cover {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 20px;
}

.player-controls {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>
