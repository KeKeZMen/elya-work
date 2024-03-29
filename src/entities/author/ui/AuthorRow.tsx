import { Author } from "@prisma/client";
import React, { FC } from "react";

type PropsType = {
  author: Author;
  editButton?: JSX.Element;
  deleteButton?: JSX.Element;
};

export const AuthorRow: FC<PropsType> = ({
  author,
  deleteButton,
  editButton,
}) => {
  return (
    <div
      key={author.id}
      className="flex justify-between border-b p-3 last:border-none"
    >
      <p>{author.name}</p>
      <div className="flex gap-3">
        {editButton}
        {deleteButton}
      </div>
    </div>
  );
};
