import { usePersonalListStore } from "@/store/usePersonalListStore";
import { useState } from "react";
import { EmojiPicker } from "./EmojiPicker";


export default function EditListModal({ list, onClose }) {
  const [name, setName] = useState(list?.name || "");
  const [emoji, setEmoji] = useState(list?.emoji || "📝");
  const { updateList, deleteList } = usePersonalListStore();

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    updateList(list.id, name.trim(), emoji);
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
          Modifier la liste
        </h2>

        <EmojiPicker selected={emoji} onSelect={setEmoji} />

        <form onSubmit={handleUpdate}>
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-700 text-white border-2 border-amber-400 outline-none mb-6"
          />

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="w-full p-3 rounded-xl bg-amber-500 text-slate-900 font-bold"
            >
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm("Supprimer ?")) {
                  deleteList(list.id);
                  onClose();
                }
              }}
              className="w-full p-2 text-red-400 text-sm italic"
            >
              Supprimer la liste
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}