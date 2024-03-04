"use client";

import { BsMoonStarsFill } from "react-icons/bs";
import { IoMdSunny } from "react-icons/io";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const ThemeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={handleChangeTheme}>
      {theme === "light" ? <IoMdSunny /> : <BsMoonStarsFill />}
    </button>
  );
};
