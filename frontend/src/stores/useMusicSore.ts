import { create } from "zustand";

export const useMusicStore = create((set) => {
  return {
    albums: [],
    songs: [],
  };
});
