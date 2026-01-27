import axiosInstance from "@/lib/axios";
import axios from "axios";
import type { Album, Song, User } from "@/types";
import { create } from "zustand";

interface MusicStore {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  stats: {
    statSongs: number;
    statAlbums: number;
    statUsers: number;
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

  setStats: (songs: Song[], albums: Album[], users: User[]) => void;
}

export const useMusicStore = create<MusicStore>((set) => {
  return {
    songs: [],
    albums: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    stats: {
      statSongs: 0,
      statAlbums: 0,
      statUsers: 0,
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

    setStats: (songs, albums, users) => {
      const totalSongs = songs?.length;
      const totalAlbums = albums?.length;
      const totalUsers = users?.length;

      set({
        stats: {
          statSongs: totalSongs,
          statAlbums: totalAlbums,
          statUsers: totalUsers,
        },
      });
    },
  };
});
