import { usePersonalListStore } from "@/store/usePersonalListStore";
import { Settings2 } from "lucide-react"; // Ou un simple ⚙️
import { useState } from "react";
import EditListModal from "./EditListModal";
import AddListModal from "./AddListModal";

export default function SelectList() {
  const { lists, currentListId, setCurrentList } = usePersonalListStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 w-full max-w-96 mx-auto mb-4 px-2">
      <select
        value={currentListId}
        onChange={(e) => {
          if (e.target.value === "ADD_NEW_LIST") setIsAddModalOpen(true);
          else setCurrentList(e.target.value);
        }}
        className="grow p-3 bg-slate-800 text-white rounded-xl border-2 border-slate-700 outline-none focus:border-amber-400 appearance-none shadow-lg text-lg"
      >
        {lists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.emoji} {list.name}
          </option>
        ))}
        <option value="ADD_NEW_LIST">➕ Créer une liste...</option>
      </select>

      {/* Bouton pour éditer la liste ACTUELLE */}
      <button
        onClick={() => setIsEditModalOpen(true)}
        className="p-3 bg-slate-700 rounded-xl text-amber-400 active:scale-90 transition-transform"
      >
        ⚙️
      </button>

      {/* Tes modales */}
      {isAddModalOpen && (
        <AddListModal onClose={() => setIsAddModalOpen(false)} />
      )}

      {isEditModalOpen && (
        <EditListModal
          list={lists.find((l) => l.id === currentListId)}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}
