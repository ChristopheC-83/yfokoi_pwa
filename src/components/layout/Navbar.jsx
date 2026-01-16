import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const links = [
    { name: "👨‍👩‍👧‍👦", path: "sharedList" },
    { name: "🔒", path: "lockedList" },
  ];

  return (
    <nav
      className="
    fixed bottom-0 w-full max-w-md p-3 flex justify-between
     bg-slate-800  text-2xl gap-2 boxShadowTop "
    >
      {links.map((link, index) => (
        <Link
          to={link.path}
          key={index}
          className="w-full flex justify-center items-center border-2 border-amber-100 p-2 rounded-lg bg-slate-900"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
