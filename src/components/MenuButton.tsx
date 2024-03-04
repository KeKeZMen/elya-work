"use client";

import { MenuContext } from "@/app/Providers";
import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export const MenuButton = () => {
  const { handleMenu } = useContext(MenuContext);

  return (
    <button className="text-2xl md:hidden" onClick={handleMenu}>
      <GiHamburgerMenu />
    </button>
  );
};
