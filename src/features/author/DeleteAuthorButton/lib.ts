"use server";

import ApiError from "@/shared/api/ApiError";
import { authOptions } from "@/shared/api/authOptions";
import { db } from "@/shared/api/db";
import { getServerSession } from "next-auth";

export const deleteAuthor = async (authorId: number) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw ApiError.unauthorized();
    if (session.user.id !== 1) throw ApiError.noEnoughRights();

    const author = await db.author.findFirst({
      where: {
        id: authorId,
      },
    });

    if (!author) throw ApiError.badRequest("Такого автора не существует!");

    await db.author.delete({
      where: {
        id: authorId,
      },
    });

    return {
      data: {
        message: "Успешно создано!",
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
