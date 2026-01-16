import { supabase } from "@/supabaseClient";

export async function getFriendsMap() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, avatar");

    if (error) throw error;

    // On crée un dictionnaire de recherche rapide du type :
    //  { "mon id" {id: "mon id", name: "Kiki", avatar: "..."}, ... }
    const friendsMap = Object.fromEntries(
      data.map((friend) => [friend.id, friend])
    );

    return friendsMap;
  } catch (error) {
    console.error("Erreur getFriendsMap:", error.message);
    return {}; // On renvoie un objet vide pour éviter les crashs au mapping
  }
}
