"use server";

import ApiError from "@/shared/api/ApiError";
import { authOptions } from "@/shared/api/authOptions";
import { db } from "@/shared/api/db";
import { getServerSession } from "next-auth";

export const deleteFromCart = async (bookId: number) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw ApiError.unauthorized();

    const orderItem = await db.orderItem.findFirst({
      where: {
        bookId,
        order: {
          userId: session.user.id,
          isSuccess: false,
        },
      },
    });

    await db.orderItem.delete({
      where: {
        id: orderItem?.id,
      },
    });

    return {
      data: {
        message: "Успешно удалено!",
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
