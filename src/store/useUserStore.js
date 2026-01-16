import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isHydrated: false,

      // ACTION PROPRE : On met juste à jour le state.
      // Zustand s'occupe de synchroniser le LocalStorage tout seul.
      setUser: (userData) => set({ user: userData }),

      setHasHydrated: (state) => set({ isHydrated: state }),

      clearUser: () => set({ user: null }),

      logout: () => {
        set({ user: null });
        // Pas besoin de removeItem manuel non plus,
        // mettre le user à null dans le state va mettre à jour le LS.
        // Si tu veux vraiment TOUT vider (y compris les autres clés du store) :
        // useUserStore.persist.clearStorage();
      },
    }),
    {
      name: "yfokoi-user-storage", // Nom de la clé dans le LS
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      },
    }
  )
);
