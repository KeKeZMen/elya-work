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
const DIR_PATH = resolve(__dirname, "../../../public/");

export const editBook = async (state: any, formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw ApiError.unauthorized();
    if (session.user.id !== 1) throw ApiError.noEnoughRights();

    const description = formData.get("description") as string;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price") as string);
    const authorId = Number(formData.get("authorId") as string);
    const categoryId = Number(formData.get("categoryId") as string);
    const bookId = Number(formData.get("bookId") as String);

    const book = await db.book.findFirst({
      where: {
        id: bookId,
      },
    });

    if (!book) throw ApiError.badRequest("Книги не существует!");

    const image = formData.get("image") as File;
    const replacedName = name.replaceAll(" ", "-").toLowerCase();
    const fileBytes = await image.arrayBuffer();
    const fileBuffer = Buffer.from(fileBytes);
    const fileName =
      image.size > 0
        ? `/books/${replacedName}.${image.name.split(".").at(-1)}`
        : book.image;
    const filePath = join(DIR_PATH, fileName);

    await unlink(join(DIR_PATH, book.image));
    await writeFile(filePath, fileBuffer);

    await db.book.update({
      where: {
        id: bookId,
      },
      data: {
        description,
        name,
        price,
        authorId,
        categoryId,
        image: image ? `${fileName}` : book.image,
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
