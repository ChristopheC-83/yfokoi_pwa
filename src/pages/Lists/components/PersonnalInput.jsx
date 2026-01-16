import { usePersonalListStore } from "@/store/usePersonalListStore";
import React, { useRef, useState } from "react";

export default function PersonnalInput({ user }) {
  const [newItem, setNewItem] = useState("");
    const inputRef = useRef(null);
    const addItem = usePersonalListStore((state) => state.addItem);

  async function handleAddItem(event) {
    event.preventDefault();
    const cleanText = newItem.trim();
    if (!cleanText) return;
    await addItem(cleanText, user.id);
    setNewItem("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <form
      className="w-full max-w-96 mx-auto bg-gray-50 border border-gray-300
     text-gray-900 text-sm rounded-lg flex justify-between sticky top-2 my-2 shadow-2xl"
      onSubmit={handleAddItem}
    >
      <input
        ref={inputRef}
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        type="text"
        placeholder="Ajouter un élément"
        className="grow  p-2 text-xl border-none outline-none"
      />
      <button type="submit" className="text-2xl pe-1" enterKeyHint="done">
        🆗
      </button>
    </form>
  );
}
