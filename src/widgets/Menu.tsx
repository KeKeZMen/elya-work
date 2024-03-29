"use client";

import { RxCross1 } from "react-icons/rx";
import { Nav } from "./Nav";
import { AnimatePresence, motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useWindowSize } from "@/shared/lib/useWindowSize";
import { useState } from "react";
import { UserProfile } from "@/entities/user/ui/UserProfile";
import { LoginButton } from "@/features/auth/LoginButton";
import { LogoutButton } from "@/features/auth/LogoutButton";
import { useSession } from "next-auth/react";

export const Menu = () => {
  const { data } = useSession();
  const [isOpenedMenu, setisOpenedMenu] = useState(false);
  const handleMenu = () => {
    setisOpenedMenu((prev) => !prev);
  };

  const { width } = useWindowSize();
  if (!width || width >= 768) return null;

  return (
    <>
      <button className="text-2xl md:hidden" onClick={handleMenu}>
        <GiHamburgerMenu />
      </button>

      <AnimatePresence>
        {isOpenedMenu && (
          <motion.div
            className="w-full h-full fixed z-50 top-0 left-0"
            onClick={handleMenu}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.70)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <motion.aside
              initial={{ width: 0 }}
              animate={{ width: "300px" }}
              exit={{ width: 0 }}
              className="bg-white flex flex-col h-full overflow-hidden relative z-[100]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex items-center justify-center p-6 shrink-0 min-w-[300px] relative">
                <button onClick={handleMenu} className="text-2xl absolute left-[20px]">
                  <RxCross1 />
                </button>

                <Link href={"/"} onClick={handleMenu}>
                  Главная
                </Link>
              </div>

              <Nav onClick={handleMenu} />

              <div className="w-full absolute flex items-center justify-center bottom-0 bg-[#D19E3A] text-white">
                {data?.user ? (
                  <UserProfile
                    user={data.user}
                    LogoutButton={<LogoutButton />}
                  />
                ) : (
                  <LoginButton />
                )}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
