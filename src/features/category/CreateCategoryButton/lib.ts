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
const DIR_PATH = resolve(__dirname, "../../../../public/categories");

export const createCategorty = async (state: any, formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw ApiError.unauthorized();
    if (session.user.id !== 1) throw ApiError.noEnoughRights();

    const name = formData.get("name") as string;

    const category = await db.category.create({
      data: {
        name,
      },
    });

    const image = formData.get("image") as File;
    const fileBytes = await image.arrayBuffer();
    const fileBuffer = Buffer.from(fileBytes);
    const fileName = `/${category.id}.jpg`;
    const filePath = join(DIR_PATH, "/", fileName);

    await writeFile(filePath, fileBuffer);

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
