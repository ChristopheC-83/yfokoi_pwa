import { supabase } from "@/supabaseClient"; // On utilise l'alias @/ maintenant !
import { useUserStore } from "@/store/useUserStore";

export default function useLogin() {
  const setUser = useUserStore((state) => state.setUser);
  const loading = useUserStore((state) => state.loading);

  async function login(email) {
    // 1. VALIDATION RAPIDE
    if (!email?.trim() || !email.includes("@")) {
      return {
        success: false,
        error: "Entre un email valide pour te connecter ! 📧",
      };
    }


    try {
      // 2. RÉCUPÉRATION DES INFOS DANS SUPABASE
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email.trim().toLowerCase())
        .single(); // On veut un seul objet, pas un tableau

      if (error) {
        // Si Supabase ne trouve rien, il renvoie une erreur (PGRST116)
        if (error.code === "PGRST116") {
          return {
            success: false,
            error:
              "Aucun compte trouvé avec cet email. Inscris-toi d'abord ! 😊",
          };
        }
        throw error;
      }

      // 3. MISE À JOUR DU STORE (Zustand + LocalStorage via persist)
      setUser(data);

      return { success: true, data };
    } catch (e) {
      console.error("Erreur Login:", e);
      return {
        success: false,
        error: "Erreur technique lors de la connexion. Réessaie.",
      };
    } 
  }

  return { login, loading };
}
