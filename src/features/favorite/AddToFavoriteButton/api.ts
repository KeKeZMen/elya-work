"use server";

import ApiError from "@/shared/api/ApiError";
import { authOptions } from "@/shared/api/authOptions";
import { db } from "@/shared/api/db";
import { getServerSession } from "next-auth";

export const addToFavorite = async (bookId: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw ApiError.unauthorized();

    const favorite = await db.favorite.findFirst({
      where: {
        bookId,
        userId: session.user.id,
      },
    });
    if (favorite) throw ApiError.badRequest("Уже в избранном!");

    await db.favorite.create({
      data: {
        bookId,
        userId: session.user.id,
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
