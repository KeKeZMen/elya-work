"use server";

import ApiError from "@/shared/api/ApiError";
import { authOptions } from "@/shared/api/authOptions";
import { db } from "@/shared/api/db";
import { unlink } from "fs/promises";
import { getServerSession } from "next-auth";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DIR_PATH = resolve(__dirname, "../../../../public/books");

export const deleteBook = async (bookId: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw ApiError.unauthorized();
    if (session.user.id !== 1) throw ApiError.noEnoughRights();

    const book = await db.book.findFirst({
      where: {
        id: bookId,
      },
    });

    if (!book) throw ApiError.badRequest("Такой книги не существует!");

    unlink(join(DIR_PATH, "/", `${book.id}.jpg`)).catch((e) => console.log(e));

    await db.book.delete({
      where: {
        id: bookId,
      },
    });

    return {
      data: {
        message: "Успешно удалено!",
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
