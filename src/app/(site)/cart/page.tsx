import React from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/api/authOptions";
import { redirect } from "next/navigation";
import { db } from "@/shared/api/db";
import { Button } from "@/shared/ui/button";
import { OrderedBookRow } from "@/entities/book/ui/OrderedBookRow";

export const metadata: Metadata = {
  title: "Book`s | Корзина",
};

export default async function CartPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/");

  const order = await db.order.findFirst({
    where: {
      isSuccess: false,
      userId: session.user.id,
    },
    select: {
      id: true,
      orderItems: {
        select: {
          book: {
            select: {
              author: {
                select: {
                  name: true,
                },
              },
              category: {
                select: {
                  name: true,
                },
              },
              name: true,
              price: true,
              id: true,
              authorId: true,
              categoryId: true,
              description: true,
              discount: true
            },
          },
        },
      },
    },
  });

  return (
    <main className="md:container pt-20 md:pt-28 flex flex-col gap-3 md:flex-row">
      {order ? (
        <>
          <div className="flex flex-col w-full md:w-[70%]">
            <div className="border-b border-gray-400 pb-3 flex justify-between md:justify-start items-center mb-3">
              <h2 className="mr-10 text-2xl font-bold">Корзина</h2>
              <p className="text-gray-500">{order?.orderItems.length} товара</p>
            </div>
            <div className="flex flex-col gap-3">
              {order.orderItems.map((orderItem) => (
                <OrderedBookRow book={orderItem.book} key={orderItem.book.id} />
              ))}
            </div>
          </div>
          <div className="shadow-md rounded-md p-2 w-full md:w-[30%] h-min">
            <h2>Сумма заказа</h2>
            <div className="pb-3 border-b flex justify-between">
              <p>{order.orderItems.length} товара на сумму: </p>
              <p>
                {order.orderItems.reduce((acc, cur) => acc + cur.book.price, 0)}{" "}
                ₽
              </p>
            </div>
            <Button
              disabled={order.orderItems.length < 1}
              className="w-full mt-3 z-0 disabled:bg-primary/50 disabled:opacity-100"
            >
              Перейти к оформлению
            </Button>
          </div>
        </>
      ) : (
        <h1 className="self-center justify-self-center w-full text-center font-bold text-2xl">
          Вы не добавили ни одного товара в корзину!
        </h1>
      )}
    </main>
  );
}
