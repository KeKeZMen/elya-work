import { Category } from "@prisma/client";
import { FC } from "react";

type PropsType = {
  category: Category;
  deleteButton?: JSX.Element;
  editButton?: JSX.Element;
};

export const CategoryRow: FC<PropsType> = ({
  category,
  deleteButton,
  editButton,
}) => {
  return (
    <div
      className="flex justify-between border-b p-3 last:border-none"
      key={category.id}
    >
      <p>{category.name}</p>
      <div className="flex gap-3">
        {editButton}
        {deleteButton}
      </div>
    </div>
  );
};
