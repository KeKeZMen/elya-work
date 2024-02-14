"use client";
import { useWindowSize } from "@/lib/useWindowSize";
import { IoSearch } from "react-icons/io5";

export const SearchInput = () => {
  const { width } = useWindowSize();

  if (width && width > 768) return <input type="text" />;

  return (
    <>
      <button className="text-2xl">
        <IoSearch />
      </button>
    </>
  );
};
