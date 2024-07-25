export class AudioQueue extends EventTarget {
  private audio: HTMLAudioElement;
  private crossfadeDuration: number; // Crossfade duration in milliseconds
  private currentVolume: number = 1; // Default volume

  constructor(crossfadeDuration: number = 4000) {
    super();
    this.audio = new Audio();
    this.crossfadeDuration = crossfadeDuration;
    this.audio.loop = false; // Disable automatic looping

    // Listen for the 'ended' event and emit a custom event
    this.audio.addEventListener('ended', () => {
      this.dispatchEvent(new CustomEvent('songEnded', { detail: { message: 'Song has finished playing.' } }));
    });
  }

  set volume(value: number) {
    // Ensure the volume is within the valid range [0, 1]
    this.currentVolume = Math.max(0, Math.min(1, value));
    this.audio.volume = this.currentVolume;
  }

  get volume(): number {
    return this.currentVolume;
  }

  playSong(songUrl: string) {
    this.audio.crossOrigin = 'anonymous';
    this.audio.src = songUrl;
    this.audio.volume = 0;
    this.audio.play();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.src = '';
  }

  crossfadeTo(newSongUrl: string) {
    console.log('finishing old song...');
    const fadeOutDuration = this.crossfadeDuration / 2;

    const fadeOutPromise = new Promise((resolve) => {
      const fadeOutInterval = setInterval(() => {
        this.volume -= 0.05;
        if (this.volume <= 0.05) {
          clearInterval(fadeOutInterval);
          this.audio.pause();
          resolve('Fade out complete');
        }
      }, fadeOutDuration / 10);
      console.log("finished old song");
    });
    // Wait for the fade out to complete before starting the fade in
    console.log('starting new song:', newSongUrl);
    fadeOutPromise.then(() => {
      this.playSong(newSongUrl);
      const fadeInInterval = setInterval(() => {
        this.volume += 0.05;
        if (this.volume >= 0.95) {
          this.volume = 1;
          clearInterval(fadeInInterval);
        }
      }, fadeOutDuration / 10);
      console.log('new song is playing');
    });
  }
}