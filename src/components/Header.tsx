import React from "react";
import { GiBookmarklet } from "react-icons/gi";
import { SearchInput } from "./SearchInput";
import { MenuButton } from "./MenuButton";

export const Header = () => {
  return (
    <header className="fixed top-0 w-full flex justify-between items-center p-5 bg-white bg-opacity-80">
      <div className="flex gap-3">
        <MenuButton />

        <div className="flex justify-between items-center gap-2">
          <GiBookmarklet />
          <h1>Book`s</h1>
        </div>
      </div>

      <SearchInput />
    </header>
  );
};
