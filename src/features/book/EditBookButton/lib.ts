"use server";

import ApiError from "@/shared/api/ApiError";
import { authOptions } from "@/shared/api/authOptions";
import { db } from "@/shared/api/db";
import { unlink, writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DIR_PATH = resolve(__dirname, "../../../../public/books");

export const editBook = async (state: any, formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw ApiError.unauthorized();
    if (session.user.id !== 1) throw ApiError.noEnoughRights();

    const description = formData.get("description") as string;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price") as string);
    const discount = Number(formData.get("discount") as string);
    const authorId = Number(formData.get("authorId") as string);
    const categoryId = Number(formData.get("categoryId") as string);
    const bookId = formData.get("bookId") as string;

    const book = await db.book.findFirst({
      where: {
        id: bookId,
      },
    });

    if (!book) throw ApiError.badRequest("Книги не существует!");

    const image = formData.get("image") as File;
    const fileBytes = await image.arrayBuffer();
    const fileBuffer = Buffer.from(fileBytes);
    const fileName = `/${book.id}.jpg`
    const filePath = join(DIR_PATH, "/", fileName);

    await unlink(join(DIR_PATH, fileName));
    await writeFile(filePath, fileBuffer);

    await db.book.update({
      where: {
        id: bookId,
      },
      data: {
        description,
        discount,
        name,
        price,
        authorId,
        categoryId,
      },
    });

    return {
      data: {
        message: "Успешно отредактировано!",
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
