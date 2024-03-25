"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteCategory = async (categoryId: number) => {
  try {
    await db.category.delete({
      where: {
        id: categoryId,
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
