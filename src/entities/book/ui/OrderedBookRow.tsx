import { IBookWithAuthorAndCategory } from "@/shared/lib/typecode";
import React, { FC } from "react";

type PropsType = {
  book: IBookWithAuthorAndCategory;
};

export const OrderedBookRow: FC<PropsType> = ({ book }) => {
  return (
    <div className="flex flex-row justify-between" key={book.id}>
      <div className="flex flex-row gap-3">
        <img
          src={`/books/${book.id}.jpg`}
          alt=""
          className="rounded-md h-[200px]"
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-xl">{book.name}</h3>
          <p>{book.author.name}</p>
          <p>{book.category.name}</p>
        </div>
      </div>
      <p>{book.price} ₽</p>
    </div>
  );
};
