"use client";

import { RxCross1 } from "react-icons/rx";
import { Nav } from "./Nav";
import { ThemeButton } from "@/features/theme/ThemeButton";
import { AnimatePresence, motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useWindowSize } from "@/shared/lib/useWindowSize";
import { useState } from "react";

export const Menu = () => {
  const { width } = useWindowSize();
  const [isOpenedMenu, setisOpenedMenu] = useState(false);
  const handleMenu = () => {
    setisOpenedMenu((prev) => !prev);
  };

  if (!width || width >= 768) return null;

  return (
    <>
      <button className="text-2xl md:hidden" onClick={handleMenu}>
        <GiHamburgerMenu />
      </button>

      <AnimatePresence>
        {isOpenedMenu && (
          <motion.div
            className="w-full h-full fixed z-20 top-0 left-0"
            onClick={handleMenu}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.70)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <motion.aside
              initial={{ width: 0 }}
              animate={{ width: "300px" }}
              exit={{ width: 0 }}
              className="bg-white flex flex-col h-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex items-center p-6 justify-between shrink-0 min-w-[300px]">
                <button onClick={handleMenu} className="text-2xl">
                  <RxCross1 />
                </button>

                <Link href={"/"} onClick={handleMenu}>
                  Главная
                </Link>

                <ThemeButton />
              </div>

              <Nav onClick={handleMenu} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
