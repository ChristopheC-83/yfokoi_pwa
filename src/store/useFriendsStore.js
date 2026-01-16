import { supabase } from "@/supabaseClient";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useUserStore } from "./useUserStore";

const TTL_DURATION = 1000 * 60 * 60; // 1 heure en millisecondes

export const useFriendStore = create(
  persist(
    (set, get) => ({
      friends: {},
      lastFetched: null, // Timestamp
      isLoading: false,

      fetchFriends: async (force = false) => {
        const myId = useUserStore.getState().user.id;

        const now = Date.now();
        const { lastFetched, friends, isLoading } = get();

        // Si on n'est pas en force, qu'on a des données et que le TTL est encore bon : on skip
        if (!force && lastFetched && now - lastFetched < TTL_DURATION) {
          console.log("Amis chargés depuis le cache (TTL OK) 🛡️");
          return;
        }

        if (isLoading) return;

        set({ isLoading: true });

        try {
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .neq("id", myId);
          if (error) throw error;

          const friendsMap = Object.fromEntries(data.map((f) => [f.id, f]));

          set({
            friends: friendsMap,
            lastFetched: now,
            isLoading: false,
          });
          console.log("Amis rafraîchis depuis Supabase 🚀");
        } catch (err) {
          set({ isLoading: false });
          console.error(err.message);
        }
      },
    }),
    { name: "friends-storage" } // Persistance dans le localStorage
  )
);
