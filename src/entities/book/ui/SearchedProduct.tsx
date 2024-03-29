import { ISearchedProduct } from "@/shared/lib/typecode";
import Link from "next/link";
import React, { FC } from "react";

type PropsType = {
  book: ISearchedProduct;
  onClick?: () => void;
};

export const SearchedProduct: FC<PropsType> = ({ book, onClick }) => {
  return (
    <Link onClick={onClick} href={`/book/${book.id}`} className="p-1">
      <p>
        {book.name}: {book.price}₽
      </p>
    </Link>
  );
};
