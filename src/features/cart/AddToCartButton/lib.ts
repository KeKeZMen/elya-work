"use server";

import ApiError from "@/shared/api/ApiError";
import { authOptions } from "@/shared/api/authOptions";
import { db } from "@/shared/api/db";
import { getServerSession } from "next-auth";

export const addToCart = async (bookId: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw ApiError.unauthorized();

    let order = await db.order.findFirst({
      where: {
        userId: session.user.id,
        isSuccess: false,
      },
    });

    if (!order) {
      order = await db.order.create({
        data: {
          isSuccess: false,
          userId: session.user.id,
        },
      });
    }

    await db.orderItem.create({
      data: {
        bookId,
        orderId: order.id,
      },
    });

    return {
      data: {
        message: "Успешно добавлено!",
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
