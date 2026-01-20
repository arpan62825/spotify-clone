import axiosInstance from "@/lib/axios";
import { create } from "zustand";
import type { User } from "@/types";

interface ChatStore {
  users: User[];
  fetchUsers: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const useChatStore = create<ChatStore>((set) => {
  return {
    users: [],
    isLoading: false,
    error: null,

    fetchUsers: async () => {
      set({ isLoading: true, error: null });

      try {
        const res = await axiosInstance.get("/user/");
        set({ users: res.data });
      } catch (error) {
        console.error(`An error occurred while fetching users: ${error}`);
      } finally {
        set({ isLoading: false });
      }
    },
  };
});

export default useChatStore;
