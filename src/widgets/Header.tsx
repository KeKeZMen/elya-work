import React from "react";
import { FaBook } from "react-icons/fa6";
import { SearchInput } from "@/features/search/SearchInput";
import { Nav } from "./Nav";
import Link from "next/link";
import { LoginButton } from "@/features/auth/LoginButton";
import { getServerSession } from "next-auth";
import { UserProfile } from "@/entities/user/ui/UserProfile";
import { LogoutButton } from "@/features/auth/LogoutButton";
import { authOptions } from "@/shared/api/authOptions";
import { Menu } from "./Menu";

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="fixed top-0 w-full p-3 bg-white bg-opacity-80 md:px-10 shadow-md">
      <div className="flex justify-between items-center md:container ">
        <div className="flex gap-3">
          <Menu />

          <Link
            href={"/"}
            className="flex justify-between items-center gap-2 text-3xl"
          >
            <FaBook />
            <h1>Book`s</h1>
          </Link>
        </div>

        <SearchInput />

        <div className="flex items-center">
          {session?.user ? (
            <UserProfile user={session.user} LogoutButton={<LogoutButton />} />
          ) : (
            <LoginButton />
          )}

          <div className="hidden md:block">
            <Nav />
          </div>
        </div>
      </div>
    </header>
  );
}
