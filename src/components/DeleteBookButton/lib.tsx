"use server";

import { db } from "@/lib/db";
import { unlink } from "fs/promises";
import { revalidatePath } from "next/cache";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DIR_PATH = resolve(__dirname, "../../../public/");

export const deleteBook = async (bookId: number) => {
  try {
    const book = await db.book.findFirst({
      where: {
        id: bookId,
      },
    });

    if(!book) throw new Error("Такой книги не существует!")
  
    if(book.image) {
      await unlink(join(DIR_PATH, "/", book.image));
    }
  
    await db.$transaction([
      db.book.delete({
        where: {
          id: bookId,
        },
      }),
      db.orderItem.deleteMany({
        where: {
          id: bookId,
        },
      }),
    ]);

    revalidatePath("/admin");
    
    return {
      data: {
        message: "Успешно удалено!"
      }
    }
  } catch (error) {
    return {
      error: {
        message: String(error ?? "Ошибка сервера")
      }
    }
  }
};
