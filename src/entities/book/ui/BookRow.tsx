import { Book } from "@prisma/client";
import React, { FC } from "react";

type PropsType = {
  book: Book;
  editButton?: JSX.Element;
  deleteButton?: JSX.Element;
};

export const BookRow: FC<PropsType> = ({ book, deleteButton, editButton }) => {
  return (
    <div
      key={book.id}
      className="flex justify-between border-b last:border-none p-3"
    >
      <p>{book.name}</p>
      <div className="flex gap-3">
        {editButton}
        {deleteButton}
      </div>
    </div>
  );
};
