import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "sonner";
import { useUserStore } from "@/store/useUserStore";
import Loader from "../Loader";
import Avatar from "./Avatar";

export default function Layout() {
  const user = useUserStore((state) => state.user);
  const isHydrated = useUserStore((state) => state.isHydrated);

  if (!isHydrated) return <Loader />;

  return (
    <div className="min-h-svh bg-slate-600 text-amber-100 flex flex-col min-w-svw items-center relative pb-16">
      <main className="grow flex bg-slate-800 w-full max-w-md  overflow-x-hidden">
        <Toaster position="top-center" richColors expand={true} />
        <Outlet />
      </main>
      {user && <Navbar />}
    </div>
  );
}
