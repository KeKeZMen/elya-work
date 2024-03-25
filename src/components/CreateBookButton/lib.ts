"use server";

import { db } from "@/lib/db";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DIR_PATH = resolve(__dirname, "../../../public/books");

export const createBook = async (state: any, formData: FormData) => {
  try {
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

    revalidatePath("/admin");

    return {
      data: {
        message: "Успешно создано!",
      },
    };
  } catch (error) {
    return {
      error: {
        message: "Ошибка сервера",
      },
    };
  }
};
