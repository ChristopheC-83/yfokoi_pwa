import Loader from "@/components/Loader";

import Title from "@/components/Title";

import { getFriendsMap } from "@/lib/getFriends";

import { useUserStore } from "@/store/useUserStore";

import React, { useEffect, useState } from "react";

import Item from "./components/Item";
import { useFriendStore } from "@/store/useFriendsStore";
import { useSharedItemsStore } from "@/store/useSharedItemsStore";
import SharedInput from "./components/SharedInput";

export default function SharedList() {
  // 1. Branchement aux stores (Selecteurs précis pour la performance)
  const user = useUserStore((state) => state.user);
  const isHydrated = useUserStore((state) => state.isHydrated);

  const friends = useFriendStore((state) => state.friends);
  const fetchFriends = useFriendStore((state) => state.fetchFriends);

  const { items, fetchItems, toggleItem, deleteItem, subscribe } =
    useSharedItemsStore();

  const pendingItems = items.filter((item) => !item.done);
  const completedItems = items.filter((item) => item.done);

  useEffect(() => {
    fetchFriends();
    fetchItems();
    const unsubscribe = subscribe();
    return () => unsubscribe();
  }, [fetchFriends, fetchItems, subscribe]);

  function allDoneDelete() {
    if (
      !window.confirm(
        "Tous les éléments cochés/faits seront perdu !\nConfirmer la suppression ?"
      )
    ) {
      return { success: false };
    }
    completedItems.forEach((item) => {
      deleteItem(item.id);
    });
  }

  if (!isHydrated) return <Loader />;

  return (
    <div className="flex flex-col w-full p-2 ">
      <Title text="Liste Partagée" />
      <SharedInput user={user} />
      <h2 className="text-xl text-center font-bold">En cours</h2>
      <section className="w-full flex flex-col mt-2">
        {pendingItems.map((item) => {
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
      {completedItems.length > 0 && (
        <>
          <h2 className="text-xl text-center font-bold">
            C'est ok !
            <span
              onClick={allDoneDelete}
              className="ms-2 italic font-thin text-xs text-slate-400  "
            >
              (Tout supprimer)
            </span>
          </h2>
          <section className="w-full flex flex-col mt-3">
            {completedItems.map((item) => {
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
        </>
      )}
    </div>
  );
}
