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
  stats: {
    totalSongs: number;
    totalAlbums: number;
    totalUsers: number;
    totalArtists: number;
  };

  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];

  fetchAllSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;

  fetchAlbums: () => Promise<void>;
  fetchAlbumsById: (albumId: string) => Promise<void>;

  setStats: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set, get) => {
  return {
    songs: [],
    albums: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    stats: {
      totalSongs: 0,
      totalAlbums: 0,
      totalUsers: 0,
      totalArtists: 0,
    },

    featuredSongs: [],
    madeForYouSongs: [],
    trendingSongs: [],

    fetchAllSongs: async () => {
      set({ isLoading: true });
      try {
        const res = await axiosInstance.get("/song");
        set({ songs: res.data });
      } catch (error) {
        console.error(
          `An error occurred while fetching all the songs: ${error}`,
        );
      } finally {
        set({ isLoading: false });
      }
    },

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
          `An error occurred while fetching the album by it's id: ${error}`,
        );
      } finally {
        set({ isLoading: false });
      }
    },

    fetchFeaturedSongs: async () => {
      try {
        const res = await axiosInstance.get("/song/featured");
        console.log("hola");

        set({ featuredSongs: res.data });
      } catch (error) {
        console.error(
          `An error occurred while fetching featured songs: ${error}`,
        );
      }
    },

    fetchMadeForYouSongs: async () => {
      try {
        const res = await axiosInstance.get("/song/made-for-you");
        set({ madeForYouSongs: res.data });
      } catch (error) {
        console.error(
          `An error occurred while fetching the made for you songs: ${error}`,
        );
      }
    },

    fetchTrendingSongs: async () => {
      try {
        const res = await axiosInstance.get("/song/trending");
        set({ trendingSongs: res.data });
      } catch (error) {
        console.error(
          `An error occurred while fetching the trending songs: ${error}`,
        );
      }
    },

    setStats: async () => {
      set({ isLoading: true });
      try {
        const res = await axiosInstance.get("/stat");
        console.log("hi");
        console.log(res.data);
        set({ stats: res.data });
      } catch (error) {
        console.error(`An error occurred while fetching stats: ${error}`);
      } finally {
        set({ isLoading: false });
      }
    },
  };
});
