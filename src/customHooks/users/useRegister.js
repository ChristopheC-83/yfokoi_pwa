import { supabase } from "../../supabaseClient";
import { useUserStore } from "../../store/useUserStore";

export default function useRegister() {
  // On récupère l'action du store Zustand
  const setUser = useUserStore((state) => state.setUser);
  const loading = useUserStore((state) => state.loading);

  async function register(name, email, avatar) {
    // 1. VALIDATION (Efficacité maximale : on stoppe vite si pb avec les données envoyées)
    if (!name?.trim()) {
      return {
        success: false,
        error: "Pense à renseigner un nom ou un pseudo 😉",
      };
    }
    if (!email?.trim() || !email.includes("@")) {
      return { success: false, error: "On aura besoin d'un email valide !" };
    }
    if (!avatar) {
      return { success: false, error: "Quelle trogne te représentera ?" };
    }

    try {
      // 2. ENVOI DB Supabase
      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            avatar,
          },
        ])
        .select() // récupère une taleau avec un objet, nous ne voulons que l'objet => .single()
        .single(); // Récupère l'objet créé immédiatement du tableau reçu de la DB par select

      if (error) {
        // Code 23505 = Violation de contrainte unique
        if (error.code === "23505") {
          // On regarde ce que contient le message d'erreur de la DB
          const message = error.message.toLowerCase();

          //  si le mail est "unique" en db
          if (message.includes("email")) {
            return {
              success: false,
              error: "Cet email est déjà utilisé par un autre membre. 📧",
            };
          }
          // si le nom est "unique" en db
          if (message.includes("name")) {
            return {
              success: false,
              error: "Ce nom est déjà pris, choisis-en un autre ! ✋",
            };
          }

          return { success: false, error: "Ce compte existe déjà." };
        }
        throw error;
      }

      // 3. MISE À JOUR DU CONTEXTE (Zustand)
      // On stocke la donnée propre venant de la DB (avec son ID, sa date de création, etc.)
      setUser(data);

      return { success: true, data };
    } catch (e) {
      console.error("Erreur Register:", e);
      return {
        success: false,
        error: "Problème avec la base de données. Réessaie plus tard.",
      };
    }
  }

  return { register, loading };
}
