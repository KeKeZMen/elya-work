import { db } from "@/lib/db";
import { Button } from "@/lib/ui/button";
import { redirect } from "next/navigation";
import React from "react";

export default async function BookPage({
  params,
}: {
  params: { bookId: string };
}) {
  const book = await db.book.findFirst({
    where: {
      id: Number(params.bookId),
    },
    select: {
      author: {
        select: {
          name: true,
        },
      },
      name: true,
      image: true,
      id: true,
      description: true,
      category: {
        select: {
          name: true,
        },
      },
      price: true,
    },
  });

  if (!book) redirect("/catalog");

  return (
    <main className="md:container pt-20 md:pt-[150px]">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="md:w-[25%] flex flex-col gap-3">
          <img
            src={book?.image}
            alt=""
            className="h-[357px] w-full rounded-md mb-6"
          />
          <Button className="w-full">Добавить в корзину</Button>
          <Button variant={"outline"} className="w-full">
            Добавить в избранное
          </Button>
        </div>
        <div className="md:w-[75%]">
          <div className="md:border-b-2 flex flex-col gap-3">
            <h2 className="text-4xl font-bold">{book.name}</h2>
            <p>{book.author.name}</p>
            <p>Стоимость: {book.price}₽</p>
            <p className="pb-3">Жанр: {book.category.name}</p>
          </div>
          <p className="pt-3">{book.description}</p>
        </div>
      </div>
    </main>
  );
}
