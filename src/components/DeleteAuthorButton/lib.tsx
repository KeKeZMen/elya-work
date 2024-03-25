"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteAuthor = async (authorId: number) => {
  await db.author.delete({
    where: {
      id: authorId,
    },
  });

  revalidatePath("/admin");
};
