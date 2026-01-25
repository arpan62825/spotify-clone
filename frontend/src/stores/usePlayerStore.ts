import { create } from "zustand";
import type { Song } from "@/types";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;

  initializeQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

const usePlayerStore = create<PlayerStore>((set, get) => {
  return {
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    initializeQueue: (songs: Song[]) => {
      set({
        queue: songs,
        currentSong: get().currentSong || songs[0],
        currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
      });
    },

    playAlbum: (songs: Song[], startIndex = 0) => {
      if (songs.length === 0) return;

      set({
        queue: songs,
        currentSong: songs[startIndex],
        currentIndex: startIndex,
        isPlaying: true,
      });
    },

    setCurrentSong: (song: Song | null) => {
      if (!song) return;

      const songIndex = get().queue.findIndex((s) => s._id === song._id);

      set({
        currentSong: song,
        isPlaying: true,
        currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
      });
    },

    togglePlay: () => {
      set({ isPlaying: !get().isPlaying });
    },

    playNext: () => {
      const { currentIndex, queue } = get();
      const nextIndex = currentIndex + 1;

      if (nextIndex < queue.length) {
        set({
          currentSong: queue[nextIndex],
          currentIndex: nextIndex,
          isPlaying: true,
        });
      } else {
        set({ isPlaying: false });
      }
    },

    playPrevious: () => {
      const { currentIndex, queue } = get();
      const previousIndex = currentIndex - 1;

      if (previousIndex >= 0) {
        set({
          currentSong: queue[previousIndex],
          currentIndex: previousIndex,
          isPlaying: true,
        });
      } else {
        set({ isPlaying: false });
      }
    },
  };
});

export default usePlayerStore;
