"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteCategory = async (categoryId: number) => {
  await db.category.delete({
    where: {
      id: categoryId,
    },
  });

  revalidatePath("/admin");
};
