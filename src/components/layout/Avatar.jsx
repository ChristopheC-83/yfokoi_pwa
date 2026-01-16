import React from "react";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";

export default function Avatar() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="right-2 absolute top-2 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-fit h-fit p-0 rounded-full">
            <img
              src={user.avatar}
              className="w-14 h-14 rounded-full border-2 border-amber-500 boxShadowAvatar"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>
            <Link to="/profile">
              <p>Profil</p>
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuLabel>
            <Link to="/myFriends">
              <p>Mes Liens</p>
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuLabel onClick={handleLogout}>
            <p>Déconnexion</p>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
