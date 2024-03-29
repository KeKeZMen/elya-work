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
const DIR_PATH = resolve(__dirname, "../../../../public/categories");

export const deleteCategory = async (categoryId: number) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw ApiError.unauthorized();
    if (session.user.id !== 1) throw ApiError.noEnoughRights();

    const category = await db.category.findFirst({
      where: {
        id: categoryId,
      },
    });

    if (!category) throw ApiError.badRequest("Такой категории не существует!");

    await db.category.delete({
      where: {
        id: categoryId,
      },
    });

    const filePath = join(DIR_PATH, "/", `${categoryId}.jpg`);
    await unlink(filePath);

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
