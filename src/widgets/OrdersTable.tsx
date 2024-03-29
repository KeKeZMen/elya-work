import React from "react";
import { DataTable } from "@/shared/ui/DataTable";
import { db } from "@/shared/api/db";
import { OrderRow } from "@/entities/order/ui/OrderRow";

export const OrdersTable = async () => {
  const orders = await db.order.findMany({
    select: {
      id: true,
      isSuccess: true,
      createdAt: true,
      userId: true,
      user: {
        select: {
          email: true,
        },
      },
      orderItems: {
        select: {
          book: true,
        },
      },
    },
    where: {
      isSuccess: true
    }
  });

  return (
    <DataTable title="Заказы" fullWidth margin="12px 0">
      {orders.map((order) => (
        <OrderRow order={order} key={order.id} />
      ))}
    </DataTable>
  );
};
