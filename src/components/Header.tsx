import React from "react";
import { FaBook } from "react-icons/fa6";
import { SearchInput } from "./SearchInput";
import { MenuButton } from "./MenuButton";
import { Nav } from "./Nav";
import Link from "next/link";
import { LoginButton } from "./LoginButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserProfile } from "./UserProfile";
import { LogoutButton } from "./LogoutButton";

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="fixed top-0 w-full flex justify-between items-center p-3 bg-white bg-opacity-80 md:px-10">
      <div className="flex gap-3">
        <MenuButton />

        <Link
          href={"/"}
          className="flex justify-between items-center gap-2 text-3xl"
        >
          <FaBook />
          <h1>Book`s</h1>
        </Link>
      </div>

      {session?.user ? (
        <UserProfile user={session.user} LogoutButton={<LogoutButton />} />
      ) : (
        <LoginButton />
      )}

      <SearchInput />

      <div className="hidden md:block">
        <Nav />
      </div>
    </header>
  );
}
