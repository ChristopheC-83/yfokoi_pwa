import { useState } from "react"; 
import { supabase } from "../../supabaseClient";
import { useUserStore } from "../../store/useUserStore";

export default function useDelete() {
  const setUser = useUserStore((state) => state.setUser);
  const [isRemoving, setIsRemoving] = useState(false);
  const logout = useUserStore((state) => state.logout);

  async function deleteAccount(userId) {
    if (
      !window.confirm(
        "Action irréversible ! Veux-tu vraiment supprimer ton compte et toutes tes données ? 😱"
      )
    ) {
      return { success: false };
    }
    setIsRemoving(true);
    try {
      // 2. ENVOI DB (Update avec un OBJET, pas un tableau)
      const { data, error } = await supabase
        .from("users")
        .delete()
        .eq("id", userId);

      if (error) {
        throw error;
      }
      logout();

      return { success: true, data };
    } catch (e) {
      console.error("Erreur détaillée :", e.message);
      return { success: false, error: e.message };
    }
  }

  return { deleteAccount, loading: isRemoving };
}
