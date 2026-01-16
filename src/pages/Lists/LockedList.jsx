import Title from "@/components/Title";
import React from "react";
import SelectList from "./components/SelectList";
import { useUserStore } from "@/store/useUserStore";
import PersonnalInput from "./components/PersonnalInput";
import { usePersonalListStore } from "@/store/usePersonalListStore";
import PersonnalItem from "./components/PersonnalItem";

export default function LockedList() {
  const user = useUserStore((state) => state.user);
  const { items, currentListId, toggleItem, deleteItem, clearCompleted } =
    usePersonalListStore();
  const currentListItems = items.filter(
    (item) => item.listId === currentListId
  );
  const pendingItems = currentListItems.filter((item) => !item.done);
  const completedItems = currentListItems.filter((item) => item.done);

  function allDoneDelete() {
    if (
      !window.confirm(
        "Tous les éléments cochés/faits seront perdu !\nConfirmer la suppression ?"
      )
    ) {
      return { success: false };
    }
    clearCompleted(currentListId);
  }

  return (
    <div className="flex flex-col w-full p-2 relative">
      <Title text="Listes Perso" />


      <div className="sticky top-0 z-30 backdrop-blur pb-1">
        <SelectList />
        <PersonnalInput user={user} />
      </div>

      {pendingItems.length > 0 && (
        <>
          <h2 className="text-xl text-center font-bold">En cours</h2>
          <section className="w-full flex flex-col mt-2">
            {pendingItems.map((item) => {
              return (
                <PersonnalItem
                  key={item.id}
                  item={item}
                  onClickToggle={() => toggleItem(item.id)}
                  onClickDelete={() => deleteItem(item.id)}
                />
              );
            })}
          </section>
        </>
      )}
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
          <section className="w-full flex flex-col mt-2">
            {completedItems.map((item) => {
              return (
                <PersonnalItem
                  key={item.id}
                  item={item}
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
