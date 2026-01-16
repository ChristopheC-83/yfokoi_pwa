import InputField from "@/components/InputField";
import Loader from "@/components/Loader";
import Title from "@/components/Title";
import ButtonForm from "../components/ButtonForm";
import useUpdate from "@/customHooks/users/useUpdate";
import { useUserStore } from "@/store/useUserStore";
import React, { useState } from "react";
import { toast } from "sonner";
import useDelete from "@/customHooks/users/useDelete";
import { AVATARS } from "@/datas/avatars";

export default function Profile() {
  const { user } = useUserStore((state) => state);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);

  const { update, loading: isUpdating } = useUpdate();
  const { deleteAccount, loading: isDeleting } = useDelete();

  async function handleUpdate(event) {
    event.preventDefault();
    const result = await update(name, email, selectedAvatar, user.id);
    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Profil mis à jour avec succès ! ✨");
  }

  async function handleDelete() {
    const result = await deleteAccount(user.id);
    if (result.success) {
      toast.success("Compte supprimé. Au revoir ! 👋");
      navigate("/login");
    } else if (result.error) {
      toast.error(result.error);
    }
  }

  return (
    <div className="flex flex-col w-full p-2">
      <Title text="Profil" />

      <form onSubmit={handleUpdate} className="w-full max-w-96 mx-auto ">
        <InputField
          label="Nom"
          id="name"
          type="text"
          value={name}
          autoComplete="name"
          onChange={(e) => setName(e.target.value)}
          disabled={isUpdating} // Empêche de modifier pendant l'envoi
        />
        <InputField
          label="Email"
          id="email"
          type="email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          disabled={isUpdating}
        />

        <label className="block mb-3 font-medium text-amber-100">Avatar</label>
        <div className="flex gap-2 flex-wrap justify-between">
          {AVATARS.map((avatar) => (
            <img
              key={avatar.id}
              src={avatar.path}
              alt={avatar.path}
              onClick={() => !isUpdating && setSelectedAvatar(avatar.path)}
              className={`
                          w-[18%] border-2 transition duration-300 cursor-pointer
                          ${
                            selectedAvatar === avatar.path
                              ? "border-amber-500 rounded-full scale-110"
                              : "border-slate-900 rounded-lg opacity-60"
                          }
                        `}
            />
          ))}
        </div>

        <div className="mt-6">
          <ButtonForm type="submit" disabled={isUpdating}>
            {isUpdating ? "Traitement..." : "Mettre à Jour"}
          </ButtonForm>
        </div>
      </form>

      <div className="mt-6 w-full max-w-96 mx-auto p-2 bg-red-700  rounded-lg border-2 border-amber-100  text-amber-100 hover:bg-slate-700 hover:text-amber-300 duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center">
        <p onClick={handleDelete}>
          {isUpdating ? "Traitement..." : "Supprimer mon Compte"}
        </p>
      </div>
    </div>
  );
}
