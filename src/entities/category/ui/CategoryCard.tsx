import { Category } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

type PropsType = {
  category: Category;
};

export const CategoryCard: FC<PropsType> = ({ category }) => {
  return (
    <Link
      style={{ backgroundImage: `url('/categories/${category.id}.jpg')` }}
      className="rounded-md w-[236px] h-[150px] bg-center bg-no-repeat cursor-pointer"
      href={`/catalog?page=0&categoryId=${category.id}&authorId=all&startCost=0&finalCost=5000`}
    >
      <div className="bg-black/80 w-full h-full rounded-md flex justify-center items-center">
        <p className="text-white uppercase font-bold">{category.name}</p>
      </div>
    </Link>
  );
};
