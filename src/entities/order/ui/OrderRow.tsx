import { IOrderWithAuthorAndItems } from "@/shared/lib/typecode";
import React, { FC } from "react";

type PropsType = {
  order: IOrderWithAuthorAndItems;
};

export const OrderRow: FC<PropsType> = ({ order }) => {
  return (
    <div
      key={order.id}
      className="flex justify-between border-b p-3 last:border-none"
    >
      <p>{order.user.email}</p>
      <p>
        {order.orderItems
          .map((orderItem) => `${orderItem.book.name}`)
          .join(", ")}
      </p>
      <p>
        {order.orderItems.reduce(
          (acc, orderItem) => acc + orderItem.book.price,
          0
        )}
        ₽
      </p>
    </div>
  );
};
