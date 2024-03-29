"use server";

import ApiError from "@/shared/api/ApiError";
import { authOptions } from "@/shared/api/authOptions";
import { db } from "@/shared/api/db";
import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DIR_PATH = resolve(__dirname, "../../../public/books");

export const createBook = async (state: any, formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw ApiError.unauthorized();
    if (session.user.id !== 1) throw ApiError.noEnoughRights();

    const description = formData.get("description") as string;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price") as string);
    const authorId = Number(formData.get("authorId") as string);
    const categoryId = Number(formData.get("categoryId") as string);

    const image = formData.get("image") as File;
    const replacedName = name.replaceAll(" ", "-").toLowerCase();
    const fileBytes = await image.arrayBuffer();
    const fileBuffer = Buffer.from(fileBytes);
    const fileName = `${replacedName}.${image.name.split(".").at(-1)}`;
    const filePath = join(DIR_PATH, "/", fileName);

    await writeFile(filePath, fileBuffer);

    await db.book.create({
      data: {
        description,
        name,
        price,
        authorId,
        categoryId,
        image: `/books/${fileName}`,
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
