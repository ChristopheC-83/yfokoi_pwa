import { useState } from "react"; // Pour gérer le loading localement
import { supabase } from "../../supabaseClient";
import { useUserStore } from "../../store/useUserStore";

export default function useUpdate() {
  const setUser = useUserStore((state) => state.setUser);
  const [isUpdating, setIsUpdating] = useState(false);

    async function update(name, email, avatar, userId) {
    // 1. VALIDATIONS
    if (!name?.trim()) return { success: false, error: "Nom requis 😉" };
    if (!email?.trim() || !email.includes("@"))
      return { success: false, error: "Email invalide !" };
    if (!avatar) return { success: false, error: "Choisis un avatar !" };
    if (!userId) return { success: false, error: "ID utilisateur manquant." };

    setIsUpdating(true);

    try {
      // 2. ENVOI DB (Update avec un OBJET, pas un tableau)
      const { data, error } = await supabase
        .from("users")
        .update({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          avatar,
        })
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          const message = error.message.toLowerCase();
          if (message.includes("email"))
            return { success: false, error: "Email déjà pris. 📧" };
          if (message.includes("name"))
            return { success: false, error: "Nom déjà pris. ✋" };
          return { success: false, error: "Ce compte existe déjà." };
        }
        throw error;
      }

      // 3. SYNCHRO ZUSTAND
      setUser(data);
      return { success: true, data };
    } catch (e) {
      console.error("Erreur Update:", e);
      return { success: false, error: "Erreur base de données." };
    } finally {
      setIsUpdating(false);
    }
  }

  // On retourne isUpdating au lieu du loading du store pour plus de précision
  return { update, loading: isUpdating };
}
