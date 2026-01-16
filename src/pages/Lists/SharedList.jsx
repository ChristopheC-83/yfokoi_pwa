import Loader from "@/components/Loader";

import Title from "@/components/Title";

import { getFriendsMap } from "@/lib/getFriends";

import { useUserStore } from "@/store/useUserStore";

import React, { useEffect, useState } from "react";

import Item from "./components/Item";
import { useFriendStore } from "@/store/useFriendsStore";
import { useSharedItemsStore } from "@/store/useSharedItemsStore";

export default function SharedList() {
  // 1. Branchement aux stores (Selecteurs précis pour la performance)
  const user = useUserStore((state) => state.user);
  const isHydrated = useUserStore((state) => state.isHydrated);

  const friends = useFriendStore((state) => state.friends);
  const fetchFriends = useFriendStore((state) => state.fetchFriends);

  const { items, fetchItems, toggleItem, deleteItem, subscribe } =
    useSharedItemsStore();

  // const [sharedItems, setSharedItems] = useState([
  //   {
  //     id: 1,

  //     item: "faire du velo",

  //     done: false,

  //     authorId: "3d610204-5b1b-43ed-9502-3b20710e5908",
  //   },

  //   {
  //     id: 2,

  //     item: "faire de la CAP",

  //     done: false,

  //     authorId: "b2750b20-e756-4af4-acc4-ff365ff6b26d",
  //   },

  //   {
  //     id: 3,

  //     item: "faire le ménage",

  //     done: true,

  //     authorId: "3d610204-5b1b-43ed-9502-3b20710e5908",
  //   },

  //   {
  //     id: 4,

  //     item: "faire les courses",

  //     done: false,

  //     authorId: "8ba26f40-b896-4c89-9843-6237382025c5",
  //   },

  //   {
  //     id: 5,

  //     item: "faire une PWA",

  //     done: true,

  //     authorId: "b2750b20-e756-4af4-acc4-ff365ff6b26d",
  //   },
  // ]);

  // 2. Gestion du cycle de vie (Fetch + Realtime)
  useEffect(() => {
    // On charge les données initiales
    fetchFriends();
    fetchItems();
    console.log("fetchFriends : ", friends);
    console.log("fetchItems : ", items)

    // On active l'écoute en temps réel
    const unsubscribe = subscribe();

    // Nettoyage : on coupe la connexion quand on quitte le composant
    return () => unsubscribe();
  }, [fetchFriends, fetchItems, subscribe]);

  // function toggleDone(id) {
  //   setSharedItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, done: !item.done } : item
  //     )
  //   );
  // }

  // function deleteItem(id) {
  //   setSharedItems((prev) => prev.filter((item) => item.id !== id));
  // }

  if (!isHydrated) return <Loader />;

  return (
    <div className="flex flex-col w-full p-2 relative">
      <Title text="Liste Partagée" />
      <section className="w-full flex flex-col mt-3">
        {items.map((item) => {
          const author = friends[item.author_id];

          return (
            <Item
              key={item.id}
              item={item}
              // Si l'auteur n'existe pas en base, on met "Inconnu" au lieu de vide
              authorName={author?.name || "Anonyme"}
              isMine={item.author_id === user?.id}
              userName={user?.name}
              onClickToggle={() => toggleItem(item.id)}
              onClickDelete={() => deleteItem(item.id)}
            />
          );
        })}
      </section>
    </div>
  );
}
