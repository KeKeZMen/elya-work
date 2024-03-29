import { Category } from "@prisma/client";
import { FC } from "react";

type PropsType = {
  category: Category;
};

export const CategoryCard: FC<PropsType> = ({ category }) => {
  return (
    <div
      style={{ backgroundImage: `url('/categories/${category.id}.jpg')` }}
      className=" rounded-md w-[356px] h-[200px] bg-center bg-no-repeat "
    >
      <div className="bg-black/80 w-full h-full rounded-md flex justify-center items-center">
        <p className="text-white">{category.name}</p>
      </div>
    </div>
  );
};
