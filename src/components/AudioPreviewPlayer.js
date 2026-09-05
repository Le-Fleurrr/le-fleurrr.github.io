class AudioPreviewPlayer {
  constructor() {
    this.audio = new Audio();
    this.currentTrack = null;
    this.isPlaying = false;
    this.fadeOutTimeout = null;
  }
  playPreview(audioUrl, startTime = 30, duration = 10) {
    this.stop();

    this.audio.src = audioUrl;
    this.audio.currentTime = startTime;
    this.currentTrack = audioUrl;
    this.audio.play().catch(err => {
      console.error('Audio playback error:', err);
    });

    this.isPlaying = true;
    this.fadeOutTimeout = setTimeout(() => {
      this.fadeOut();
    }, duration * 1000);
  }
  fadeOut() {
    if (!this.audio) return;

    const fadeInterval = 50;
    const fadeStep = 0.05;
    let volume = this.audio.volume;

    const fade = setInterval(() => {
      volume -= fadeStep;
      if (volume <= 0) {
        clearInterval(fade);
        this.stop();
      } else {
        this.audio.volume = Math.max(0, volume);
      }
    }, fadeInterval);
  }
  stop() {
    if (this.fadeOutTimeout) {
      clearTimeout(this.fadeOutTimeout);
      this.fadeOutTimeout = null;
    }
    
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.volume = 1;
    }
    
    this.isPlaying = false;
    this.currentTrack = null;
  }
  isCurrentlyPlaying(audioUrl) {
    return this.isPlaying && this.currentTrack === audioUrl;
  }
}
export const previewPlayer = new AudioPreviewPlayer();
export const useAudioPreview = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const playPreview = (audioUrl, startTime = 30, duration = 10) => {
    previewPlayer.playPreview(audioUrl, startTime, duration);
    setIsPlaying(true);
  };

  const stopPreview = () => {
    previewPlayer.stop();
    setIsPlaying(false);
  };

  return { playPreview, stopPreview, isPlaying };
};