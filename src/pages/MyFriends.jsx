import Title from "@/components/Title";
import { useFriendStore } from "@/store/useFriendsStore";
import React, { useEffect } from "react";

export default function MyFriends() {
  // On récupère les données ET les fonctions/états de chargement
  const { friends, fetchFriends, isLoading } = useFriendStore();

  const friendsList = Object.values(friends);

  // Petit refresh auto au montage si la liste est vide
  useEffect(() => {
    if (friendsList.length === 0) fetchFriends();
  }, []);

  return (
    <div className="flex flex-col w-full p-2 relative">
      <Title text="Gestion des Liens" />

      <div className="flex items-center justify-between my-4">
        <h2 className="text-xl font-bold">Mes Amis :</h2>

        {/* BOUTON REFRESH FORCE */}
        <button
          onClick={() => fetchFriends(true)}
          disabled={isLoading}
          className={`p-2 rounded-xl bg-slate-800 text-amber-400 border border-slate-700 active:scale-90 transition-all ${
            isLoading ? "animate-spin opacity-50" : ""
          }`}
        >
          {isLoading ? "⏳" : "🔄"}
        </button>
      </div>

      <div className="space-y-2">
        {friendsList.length > 0 ? (
          friendsList.map((friend) => (
            <div
              key={friend.id}
              className="p-3 bg-slate-800/50 border border-slate-700 rounded-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-amber-100/80 flex items-center justify-center text-xl">
                👤
              </div>
              <p className="font-medium text-white">{friend.name}</p>
            </div>
          ))
        ) : (
          <p className="text-slate-500 italic text-center mt-4">
            {isLoading ? "Recherche en cours..." : "Aucun ami trouvé."}
          </p>
        )}
      </div>
    </div>
  );
}
