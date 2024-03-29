import { IBookWithAuthor } from "@/shared/lib/typecode";
import Link from "next/link";
import React, { FC } from "react";

type PropsType = {
  book: IBookWithAuthor;
};

export const BookCard: FC<PropsType> = ({ book }) => {
  return (
    <Link
      href={`/book/${book.id}`}
      key={book.id}
      className="w-[160px] flex flex-col gap-[2px]"
    >
      <img src={book.image} alt="" className="rounded-md" />
      <h2 className="text-xl font-bold">{book.name}</h2>
      <p>{book.author.name}</p>
    </Link>
  );
};