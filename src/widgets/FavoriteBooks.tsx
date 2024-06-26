import { FavoriteBook } from "@/entities/book/ui/FavoriteBook";
import { authOptions } from "@/shared/api/authOptions";
import { db } from "@/shared/api/db";
import { DataTable } from "@/shared/ui/DataTable";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const FavoriteBooks = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return redirect("/");

  const favoriteBooks = await db.favorite.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      book: {
        select: {
          author: {
            select: {
              name: true,
            },
          },
          category: {
            select: {
              name: true,
            },
          },
          authorId: true,
          categoryId: true,
          description: true,
          id: true,
          name: true,
          price: true,
          discount: true,
        },
      },
    },
  });

  return (
    <DataTable title="Избранное" fullWidth margin="14px 0" padding="10px" fullHeight>
      {favoriteBooks.length > 0 ? (
        favoriteBooks.map((favorite) => (
          <FavoriteBook book={favorite.book} key={favorite.book.id} />
        ))
      ) : (
        <h2 className="self-center font-bold text-2xl mt-3">У вас нет избранных книг</h2>
      )}
    </DataTable>
  );
};
