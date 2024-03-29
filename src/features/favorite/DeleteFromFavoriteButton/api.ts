"use server";

import ApiError from "@/shared/api/ApiError";
import { authOptions } from "@/shared/api/authOptions";
import { db } from "@/shared/api/db";
import { getServerSession } from "next-auth";

export const deleteFromFavorite = async (bookId: number) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw ApiError.unauthorized();

    const favorite = await db.favorite.findFirst({
      where: {
        bookId,
        userId: session.user.id,
      },
    });
    if (!favorite) throw ApiError.badRequest("Книга не в избранном!");

    await db.favorite.delete({
      where: {
        id: favorite.id,
      },
    });

    return {
      data: {
        message: "Успешно добавлено!",
      },
    };
  } catch (error) {
    return {
      error: {
        message: String(
          error instanceof ApiError ? error.message : "Ошибка сервера"
        ),
      },
    };
  }
};
