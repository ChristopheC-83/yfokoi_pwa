import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import InputField from "../components/InputField";
import ButtonForm from "../components/ButtonForm";
import { toast } from "sonner";
import useRegister from "../customHooks/users/useRegister";
import { AVATARS } from "@/datas/avatars";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);


  

  // On récupère tout ce qu'il faut du hook
  const { register, loading: isRegistering } = useRegister();

  async function handleRegister(event) {
    event.preventDefault();

    // On délègue TOUTE la logique au hook (Validation + DB + Zustand)
    const result = await register(name, email, selectedAvatar);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    // Succès total
    toast.success("Inscription réussie !");
    setName("");
    setEmail("");
    setSelectedAvatar(null);
  }

  return (
    <div className="flex flex-col w-full p-2">
      <Title text="Inscription" />

      <form onSubmit={handleRegister} className="w-full max-w-96 mx-auto">
        <InputField
          label="Nom"
          id="name"
          type="text"
          value={name}
          autoComplete="name"
          onChange={(e) => setName(e.target.value)}
          disabled={isRegistering} // Empêche de modifier pendant l'envoi
        />
        <InputField
          label="Email"
          id="email"
          type="email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          disabled={isRegistering}
        />

        <label className="block mb-3 font-medium text-amber-100">Avatar</label>
        <div className="flex gap-2 flex-wrap justify-between">
          {AVATARS.map((avatar) => (
            <img
              key={avatar.id}
              src={avatar.path}
              alt={avatar.path}
              onClick={() => !isRegistering && setSelectedAvatar(avatar.path)}
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
          <ButtonForm type="submit" disabled={isRegistering}>
            {isRegistering ? "Traitement..." : "S'Inscrire"}
          </ButtonForm>
        </div>
      </form>
      <div className="mt-6 w-full max-w-96 mx-auto p-2 bg-slate-900  rounded-lg border-2 border-amber-100  text-amber-100 hover:bg-slate-700 hover:text-amber-300 duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center">
        <Link to="/login">
          {isRegistering ? "Traitement..." : "Se Connecter"}
        </Link>
      </div>
    </div>
  );
}
