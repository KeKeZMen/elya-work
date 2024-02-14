"use client";

import { useContext } from "react";
import { IoIosArrowBack } from "react-icons/io";

import { Nav } from "./Nav";
import { ThemeButton } from "./ThemeButton";
import { MenuContext } from "@/app/Providers";
import { AnimatePresence, motion } from "framer-motion";

export const Menu = () => {
  const { handleMenu, isOpenedMenu } = useContext(MenuContext);

  return (
    <AnimatePresence>
      {isOpenedMenu && (
        <motion.div
          className="w-full h-full fixed z-20 top-0 left-0"
          onClick={handleMenu}
          animate={{ backgroundColor: "rgba(0, 0, 0, 0.70)" }}
          exit={{ opacity: 0 }}
        >
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: "300px" }}
            exit={{ width: 0 }}
            className="bg-white flex flex-col h-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center p-6 justify-between">
              <button onClick={handleMenu}>
                <IoIosArrowBack />
              </button>

              <h2>Главная</h2>

              <ThemeButton />
            </div>

            <Nav />
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
