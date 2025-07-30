import { create } from 'zustand';
import { Track } from '../types/types'; // Track tipini senin tanımladığın dosyadan alıyoruz

interface PlayerStore {
  currentTrack: Track | null;
  currentTrackAudio: HTMLAudioElement | null;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  slider: number;
  drag: number;

  setCurrentTrack: (track: Track) => void;
  setSlider: (val: number) => void;
  setDrag: (val: number) => void;
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => Promise<void>;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentTrack: null,
  currentTrackAudio: null,
  isPlaying: false,
  duration: 0,
  currentTime: 0,
  slider: 1,
  drag: 0,

  setCurrentTrack: (track) => {
    const { currentTrackAudio, pause } = get();
    if (currentTrackAudio) {
      pause();
      currentTrackAudio.src = '';
    }

    const audio = new Audio(track.preview_url);
    audio.preload = 'none';

    audio.addEventListener('loadeddata', () => {
      set({ duration: audio.duration, currentTime: audio.currentTime });
    });

    audio.addEventListener('timeupdate', () => {
      const currTime = audio.currentTime;
      set({
        currentTime: currTime,
        slider: currTime
          ? Number(((currTime * 100) / audio.duration).toFixed(1))
          : 0,
      });
    });

    set({
      currentTrack: track,
      currentTrackAudio: audio,
    });

    setTimeout(async () => {
      await get().play();
    }, 100);
  },

  setSlider: (val) => set({ slider: val }),

  setDrag: (val) => {
    const audio = get().currentTrackAudio;
    if (audio) {
      audio.currentTime = Math.round((val * audio.duration) / 100);
    }
    set({ drag: val });
  },

  play: async () => {
    const audio = get().currentTrackAudio;
    if (audio) {
      await audio.play();
      set({ isPlaying: true });
    }
  },

  pause: () => {
    const audio = get().currentTrackAudio;
    if (audio) {
      audio.pause();
      set({ isPlaying: false });
    }
  },

  togglePlay: async () => {
    const { isPlaying, play, pause } = get();
    isPlaying ? pause() : await play();
  },
}));
