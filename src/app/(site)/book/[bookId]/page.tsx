import { AddToCartButton } from "@/features/cart/AddToCartButton/ui";
import { DeleteFromCartButton } from "@/features/cart/DeleteFromCartButton/ui";
import { AddToFavoriteButton } from "@/features/favorite/AddToFavoriteButton/ui";
import { DeleteFromFavoriteButton } from "@/features/favorite/DeleteFromFavoriteButton/ui";
import { authOptions } from "@/shared/api/authOptions";
import { db } from "@/shared/api/db";
import { Button } from "@/shared/ui/button";
import { getServerSession } from "next-auth";
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

  const session = await getServerSession(authOptions);

  const orderItem = await db.orderItem.findFirst({
    where: {
      order: {
        userId: session?.user?.id,
        isSuccess: false,
      },
      bookId: book?.id,
    },
  });

  const favoriteBook = await db.favorite.findFirst({
    where: {
      bookId: book?.id,
      userId: session?.user?.id,
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
            className="h-[457px] w-full rounded-md mb-6"
          />
          {orderItem ? (
            <DeleteFromCartButton bookId={book.id} />
          ) : (
            <AddToCartButton bookId={book.id} />
          )}
          {favoriteBook ? (
            <DeleteFromFavoriteButton bookId={book.id} />
          ) : (
            <AddToFavoriteButton bookId={book.id} />
          )}
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
