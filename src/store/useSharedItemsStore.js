import { supabase } from "@/supabaseClient";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSharedItemsStore = create(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      lastFetched: null,

      fetchItems: async (force = false) => {
        // Cache intelligent : si on a fetch il y a moins de 30s, on skip (sauf si force)
        const now = Date.now();
        if (
          !force &&
          get().items.length > 0 &&
          now - get().lastFetched < 30000
        ) {
          return;
        }

        set({ isLoading: true });

        const { data, error } = await supabase

          .from("shared_items")
          .select("*")
          .order("created_at", { ascending: false });

        console.log("data : ", data);

        if (!error) {
          set({ items: data, lastFetched: now });
        }
        set({ isLoading: false });
      },

      // Toggle (Optimiste)
      toggleItem: async (id) => {
        const previousItems = get().items;
        let newStatus = false;

        // 1. On calcule le nouvel état et on met à jour localement
        set({
          items: previousItems.map((item) => {
            if (item.id === id) {
              newStatus = !item.done; // On inverse la valeur actuelle
              return { ...item, done: newStatus };
            }
            return item;
          }),
        });

        // 2. On envoie au serveur
        const { error } = await supabase
          .from("shared_items")
          .update({ done: newStatus })
          .eq("id", id);

        // 3. Si erreur, on rollback
        if (error) {
          console.error("Erreur toggle:", error.message);
          set({ items: previousItems });
        }
      },

      // Supprimer (Optimiste)
      deleteItem: async (id) => {
        const previousItems = get().items;
        set({ items: previousItems.filter((i) => i.id !== id) });

        const { error } = await supabase
          .from("shared_items")
          .delete()
          .eq("id", id);
        if (error) set({ items: previousItems });
      },

      // Realtime : On écoute les changements des autres
      subscribe: () => {
        const channel = supabase
          .channel("shared_items_changes")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "shared_items" },
            () => get().fetchItems() // On simplifie : un changement = un refresh
          )
          .subscribe();

        return () => supabase.removeChannel(channel);
      },
    }),
    {
      name: "shared-items-storage", // Clé dans le localStorage
      storage: createJSONStorage(() => localStorage),
      // Optionnel : on ne persiste que les items, pas le status loading
      partialize: (state) => ({
        items: state.items,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
