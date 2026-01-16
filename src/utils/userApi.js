import { supabase } from "./supabaseClient";

export async function sendUserToSupabase(user) {
  try {
    // .insert() s'occupe de tout : headers, JSON.stringify, etc.
    const { data, error } = await supabase
      .from("users") // Nom de ta table
      .insert([
        { name: user.name, email: user.email }, // Tes colonnes
      ])
      .select();

    if (error) throw error;

    return { success: true, data };
  } catch (e) {
    console.error("Erreur détaillée :", e.message);
    return { success: false, error: e.message };
  }
}
