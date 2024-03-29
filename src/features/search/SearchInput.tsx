"use client";
import { useWindowSize } from "@/shared/lib/useWindowSize";
import { IoSearch } from "react-icons/io5";

export const SearchInput = () => {
  const { width } = useWindowSize();

  if (width && width > 768)
    return (
      <div className="flex w-[50%] items-center relative">
        <input
          type="text"
          placeholder="Я ищу..."
          className="min-w-[95%] rounded-sm p-3 placeholder:text-[#949494] bg-[#D9D9D9] outline-none"
        />
        <IoSearch className="text-2xl absolute right-[60px] text-[#949494]" />
      </div>
    );

  return (
    <>
      <button className="text-2xl">
        <IoSearch />
      </button>
    </>
  );
};
