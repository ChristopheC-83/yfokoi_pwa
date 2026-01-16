import React from "react";
import Avatar from "./layout/Avatar";
import { useUserStore } from "@/store/useUserStore";

export default function Title({ text }) {
  const user = useUserStore((state) => state.user);
  return (
    <h1 className="text-3xl text-center font-bold p-4 w-full relative">
      {text}
      {user && <Avatar />}
    </h1>
  );
}
