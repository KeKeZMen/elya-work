"use client";

import { ISearchedProduct } from "@/shared/lib/typecode";
import { useDebounce } from "@/shared/lib/useDebounce";
import { useWindowSize } from "@/shared/lib/useWindowSize";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { getSearchedProducts } from "./api";

export const SearchInput = () => {
  const [isOpenedDialog, setIsOpenedDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedProducts, setSearchedProducts] = useState<
    Array<ISearchedProduct>
  >([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm !== "") {
      setIsOpenedDialog(true);
      getSearchedProducts(searchTerm).then((data) => setSearchedProducts(data));
    } else {
      setIsOpenedDialog(false);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="flex w-[50%] items-center relative">
      <input
        type="text"
        placeholder="Я ищу..."
        className="min-w-[95%] rounded-sm p-3 placeholder:text-[#949494] bg-[#D9D9D9] outline-none"
      />

      <IoSearch className="text-2xl absolute right-[10px] md:right-[60px] text-[#949494]" />
    </div>
  );
};
