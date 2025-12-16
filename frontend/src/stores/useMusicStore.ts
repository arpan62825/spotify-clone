import axiosInstance from "@/lib/axios";
import axios from "axios";
import type { Album, Song } from "@/types";
import { create } from "zustand";

interface MusicStore {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;

  fetchAlbums: () => Promise<void>;
  fetchAlbumsById: (albumId: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => {
  return {
    songs: [],
    albums: [],
    isLoading: false,
    error: null,
    currentAlbum: null,

    fetchAlbums: async () => {
      set({ isLoading: true, error: null });
      try {
        const res = await axiosInstance.get("/album");
        set({ albums: res.data });
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          set({
            error: error.response?.data?.message ?? "Failed to fetch albums",
          });
        } else {
          set({ error: "An unexpected error occurred" });
        }
      } finally {
        set({ isLoading: false });
      }
    },

    fetchAlbumsById: async (albumId) => {
      set({ error: null, isLoading: true });
      try {
        const res = await axiosInstance.get(`/album/${albumId}`);
        set({ currentAlbum: res.data });
      } catch (error) {
        console.log(
          `An error occurred while fetching the album by it's id: ${error}`
        );
      } finally {
        set({ isLoading: false });
      }
    },
  };
});
