"use client";

import { createContext, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export const MenuContext = createContext({
  isOpenedMenu: true,
  handleMenu: () => {},
});

export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpenedMenu, setisOpenedMenu] = useState(false);
  const handleMenu = () => {
    setisOpenedMenu((prev) => !prev);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <>{children}</>;

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <MenuContext.Provider value={{ handleMenu, isOpenedMenu }}>
          <Toaster />
          {children}
        </MenuContext.Provider>
      </ThemeProvider>
    </SessionProvider>
  );
};
