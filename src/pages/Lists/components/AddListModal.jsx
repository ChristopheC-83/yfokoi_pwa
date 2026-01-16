import React, { useState, useEffect, useRef } from "react";
import { usePersonalListStore } from "@/store/usePersonalListStore";
import { EmojiPicker } from "./EmojiPicker";

export default function AddListModal({ onClose }) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("📝");
  const addList = usePersonalListStore((state) => state.addList);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addList(name.trim(), emoji);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-slate-800 border border-slate-700 rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-white mb-4 text-center">
          Nouvelle Liste
        </h2>

        <EmojiPicker selected={emoji} onSelect={setEmoji} />

        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom de la liste..."
            className="w-full p-4 rounded-xl bg-slate-700 text-white border-2 border-transparent focus:border-amber-400 outline-none mb-4"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 p-3 text-slate-400 font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 p-3 rounded-xl bg-amber-500 text-slate-900 font-bold"
            >
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
