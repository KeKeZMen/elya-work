"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createAuthor = async (state: any, formData: FormData) => {
  try {
    const name = formData.get("name") as string;

    const author = await db.author.create({
      data: {
        name,
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
        message: String(error ?? "Ошибка сервера"),
      },
    };
  }
};
