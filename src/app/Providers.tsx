"use client";

import { createContext, useEffect, useState } from "react";

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
    <MenuContext.Provider value={{ handleMenu, isOpenedMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
