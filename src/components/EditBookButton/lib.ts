"use server";

import { db } from "@/lib/db";
import { unlink, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DIR_PATH = resolve(__dirname, "../../../public/");

export const editBook = async (state: any, formData: FormData) => {
  try {
    const description = formData.get("description") as string;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price") as string);
    const authorId = Number(formData.get("authorId") as string);
    const categoryId = Number(formData.get("categoryId") as string);
    const bookId = Number(formData.get("bookId") as String)

    const book = await db.book.findFirst({
      where: {
        id: bookId
      }
    })

    if(!book) throw new Error("Книги не существует!")

    const image = formData.get("image") as File;    
    const replacedName = name.replaceAll(" ", "-").toLowerCase();
    const fileBytes = await image.arrayBuffer();
    const fileBuffer = Buffer.from(fileBytes);
    const fileName = image.size > 0 ? `/books/${replacedName}.${image.name.split(".").at(-1)}` : book.image;
    const filePath = join(DIR_PATH, fileName);
    
    await unlink(join(DIR_PATH, book.image))
    await writeFile(filePath, fileBuffer);
    
    await db.book.update({
      where: {
        id: bookId
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

    revalidatePath("/admin");

    return {
      data: {
        message: "Успешно отредактировано!",
      },
    };
  } catch (error) {
    return {
      error: {
        message: String(error ?? "Ошибка сервера"),
      },
    };
  }
};
