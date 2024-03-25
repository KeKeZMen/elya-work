"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createCategorty = async (state: any, formData: FormData) => {
  try {
    const name = formData.get("name") as string;

    const category = await db.category.create({
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
        message: "Ошибка сервера",
      },
    };
  }
};
