import { IBookWithAuthorAndCategory } from "@/shared/lib/typecode";
import Link from "next/link";
import { FC } from "react";

type PropsType = {
  book: IBookWithAuthorAndCategory;
};

export const FavoriteBook: FC<PropsType> = ({ book }) => {
  return (
    <Link
      href={`/book/${book.id}`}
      className="border-b last:border-none flex justify-start gap-1 py-3"
    >
      <img
        src={`/books/${book.id}.jpg`}
        alt=""
        className="rounded-md h-[150px]"
      />
      <div className="flex flex-col gap-1">
        <p>Название: {book.name}</p>
        <p>Автор: {book.author.name}</p>
        <p>Категория: {book.category.name}</p>
        <p>Стоимость: {book.price} ₽</p>
      </div>
    </Link>
  );
};
