"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteAuthor = async (authorId: number) => {
  try {
    const author = await db.author.findFirst({
      where: {
        id: authorId,
      },
    });

    if (!author) throw new Error("Такого автора не существует!");

    await db.author.delete({
      where: {
        id: authorId,
      },
    });

    revalidatePath("/admin");

    return {
      data: {
        message: "Успешно удалено!",
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
