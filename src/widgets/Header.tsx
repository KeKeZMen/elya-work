"use client";

import React from "react";
import { FaBook } from "react-icons/fa6";
import { SearchInput } from "@/features/search/SearchInput/ui";
import { Nav } from "./Nav";
import Link from "next/link";
import { LoginButton } from "@/features/auth/LoginButton";
import { UserProfile } from "@/entities/user/ui/UserProfile";
import { LogoutButton } from "@/features/auth/LogoutButton";
import { Menu } from "./Menu";
import { useSession } from "next-auth/react";
import { useWindowSize } from "@/shared/lib/useWindowSize";

export const Header = () => {
  const { data } = useSession();
  const { width } = useWindowSize();

  return (
    <header className="fixed top-0 w-full p-3 bg-white bg-opacity-80 md:px-10 shadow-md z-50">
      <div className="flex justify-between items-center md:container ">
        <div className="flex gap-3">
          <Menu />

          <Link
            href={"/"}
            className="flex justify-between items-center gap-2 text-xl md:text-3xl"
          >
            <FaBook />
            <h1>Book`s</h1>
          </Link>
        </div>

        <SearchInput />

        <div className="flex items-center">
          {width && width >= 768 && (
            <>
              {data?.user ? (
                <UserProfile user={data.user} LogoutButton={<LogoutButton />} />
              ) : (
                <LoginButton />
              )}
            </>
          )}

          <div className="hidden md:block">
            <Nav />
          </div>
        </div>
      </div>
    </header>
  );
};
