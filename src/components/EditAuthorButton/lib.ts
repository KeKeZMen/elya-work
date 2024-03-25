"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const editAuthor = async (state: any, formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const authorId = Number(formData.get("authorId") as string);

    await db.author.update({
      where: {
        id: authorId,
      },
      data: {
        name,
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
