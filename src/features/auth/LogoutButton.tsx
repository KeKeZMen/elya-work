"use client";

import { useWindowSize } from "@/shared/lib/useWindowSize";
import { signOut } from "next-auth/react";
import { IoExitOutline } from "react-icons/io5";

export const LogoutButton = () => {
  const { width } = useWindowSize();
  if (!width) return null;

  return (
    <button onClick={() => signOut()} className="text-left text-3xl md:text-base md:w-full">
      {width >= 768 ? "Выйти" : <IoExitOutline />}
    </button>
  );
};
