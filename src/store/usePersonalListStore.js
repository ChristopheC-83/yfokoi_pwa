import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePersonalListStore = create(
  persist(
    (set, get) => ({
      lists: [{ id: "default", name: "Ma Liste", emoji: "📝" }],
      items: [],
      currentListId: "default",

      setCurrentList: (id) => set({ currentListId: id }),

      // Dans ton store...
      addList: (name, emoji = "📝") => {
        const newList = { id: crypto.randomUUID(), name, emoji };
        set((state) => ({
          lists: [...state.lists, newList],
          currentListId: newList.id,
        }));
      },

      updateList: (listId, newName, newEmoji) => {
        set((state) => ({
          lists: state.lists.map((l) =>
            l.id === listId ? { ...l, name: newName, emoji: newEmoji } : l
          ),
        }));
      },

      deleteList: (listId) => {
        set((state) => ({
          lists: state.lists.filter((l) => l.id !== listId),
          items: state.items.filter((i) => i.listId !== listId),
          currentListId: state.lists[0]?.id || null,
        }));
      },

      addItem: (text) => {
        const newItem = {
          id: crypto.randomUUID(),
          listId: get().currentListId,
          text,
          done: false,
        };
        set((state) => ({ items: [newItem, ...state.items] }));
      },

      toggleItem: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, done: !i.done } : i
          ),
        })),

      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
    }),
    { name: "yfokoi-personal-storage" }
  )
);
