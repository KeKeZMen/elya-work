"use server";

import ApiError from "@/shared/api/ApiError";
import { authOptions } from "@/shared/api/authOptions";
import { db } from "@/shared/api/db";
import { getServerSession } from "next-auth";

export const createCategorty = async (state: any, formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw ApiError.unauthorized();
    if (session.user.id !== 1) throw ApiError.noEnoughRights();

    const name = formData.get("name") as string;

    await db.category.create({
      data: {
        name,
      },
    });

    return {
      data: {
        message: "Успешно создано!",
      },
    };
  } catch (error) {
    return {
      error: {
        message: String(
          error instanceof ApiError ? error.message : "Ошибка сервера"
        ),
      },
    };
  }
};
