"use client";

import { ISearchedProduct } from "@/shared/lib/typecode";
import { useDebounce } from "@/shared/lib/useDebounce";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { getSearchedProducts } from "./api";
import { SearchedProduct } from "@/entities/book/ui/SearchedProduct";
import { RxCross1 } from "react-icons/rx";

export const SearchInput = () => {
  const [isOpenedDialog, setIsOpenedDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedProducts, setSearchedProducts] = useState<
    Array<ISearchedProduct>
  >([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const handleClean = () => {
    setSearchTerm("");
    setIsOpenedDialog(false);
  };

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
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm ? (
        <RxCross1
          className="text-2xl absolute right-[10px] md:right-[60px]"
          onClick={handleClean}
        />
      ) : (
        <IoSearch className="text-2xl absolute right-[10px] md:right-[60px] text-[#949494]" />
      )}

      {isOpenedDialog && searchedProducts && (
        <div className="absolute bg-white rounded-md px-5 top-10 w-full z-50 shadow-md max-h-[200px] overflow-y-auto">
          {searchedProducts.length < 1 ? (
            <p className="my-5 text-black">Нет совпадений</p>
          ) : (
            searchedProducts.map((book, index) => (
              <SearchedProduct book={book} key={index} onClick={handleClean} />
            ))
          )}
        </div>
      )}
    </div>
  );
};
