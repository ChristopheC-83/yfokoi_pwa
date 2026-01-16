import React, { useState } from "react";
import Title from "../components/Title";
import InputField from "../components/InputField";
import ButtonForm from "@/components/ButtonForm";
import useLogin from "@/customHooks/users/useLogin";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");

  const { login, loading: isLoginging } = useLogin();

  async function handleLogin(e) {
    e.preventDefault();
    console.log("login", email);
    const result = await login(email);
    if (!result.success) {
      toast.error(result.error);
      return;
    }
  }

  return (
    <div className="flex flex-col w-full p-2">
      <Title text="Connexion" />

      <form onSubmit={handleLogin} className="w-full max-w-96 mx-auto ">
        <InputField
          label="Ton email suffira 😉"
          id="email"
          type="email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoginging}
        />

        <div className="mt-6">
          <ButtonForm type="submit" disabled={isLoginging}>
            {isLoginging ? "Traitement..." : "Se Connecter"}
          </ButtonForm>
        </div>
      </form>
      <div className="mt-6 w-full max-w-96 mx-auto p-2 bg-slate-900  rounded-lg border-2 border-amber-100  text-amber-100 hover:bg-slate-700 hover:text-amber-300 duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center">
        <Link to="/register">
          {isLoginging ? "Traitement..." : "Créer un Compte"}
        </Link>
      </div>
    </div>
  );
}
