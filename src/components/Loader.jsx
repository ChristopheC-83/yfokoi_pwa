import React from 'react'
import { LuLoaderCircle } from "react-icons/lu";


export default function Loader() {
  return (
    <div className="w-full flex justify-center animate-spin text-3xl">
      <LuLoaderCircle />
    </div>
  );
}
