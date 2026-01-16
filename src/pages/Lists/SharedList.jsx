import Loader from "@/components/Loader";

import Title from "@/components/Title";

import { getFriendsMap } from "@/lib/getFriends";

import { useUserStore } from "@/store/useUserStore";

import React, { useEffect, useState } from "react";

import Item from "./components/Item";

export default function SharedList() {
  const [friends, setFriends] = useState([]);

  const user = useUserStore((state) => state.user);

  const isHydrated = useUserStore((state) => state.isHydrated);

  const [sharedItems, setSharedItems] = useState([
    {
      id: 1,

      item: "faire du velo",

      done: false,

      authorId: "3d610204-5b1b-43ed-9502-3b20710e5908",
    },

    {
      id: 2,

      item: "faire de la CAP",

      done: false,

      authorId: "b2750b20-e756-4af4-acc4-ff365ff6b26d",
    },

    {
      id: 3,

      item: "faire le ménage",

      done: true,

      authorId: "3d610204-5b1b-43ed-9502-3b20710e5908",
    },

    {
      id: 4,

      item: "faire les courses",

      done: false,

      authorId: "3d610204-5b1b-43ed-9502-3b20710e5908",
    },

    {
      id: 5,

      item: "faire une PWA",

      done: true,

      authorId: "b2750b20-e756-4af4-acc4-ff365ff6b26d",
    },
  ]);

  useEffect(() => {
    (async () => {
      const myFriends = await getFriendsMap();

      setFriends(myFriends);
    })();
  }, []);

  function toggleDone(id) {
    setSharedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  if (!isHydrated) return <Loader />;

  return (
    <div className="flex flex-col w-full p-2 relative">
      <Title text="Liste Partagée" />

      <section className="w-full flex flex-col">
        {sharedItems.map((item) => {
          const author = friends[item.authorId]; // Accès ultra rapide

          return (
            <Item
              key={item.id}
              item={item}
              authorName={author?.name}
              userName={user?.name}
              onClick={() => toggleDone(item.id)}
            />
          );
        })}
      </section>
    </div>
  );
}
