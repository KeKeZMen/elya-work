"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const editCategory = async (state: any, formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const categoryId = Number(formData.get("categoryId") as string);

    await db.category.update({
      where: {
        id: categoryId,
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
