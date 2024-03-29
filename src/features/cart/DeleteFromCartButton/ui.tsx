"use client";

import { Button } from "@/shared/ui/button";
import { deleteFromCart } from "./lib";
import { FC } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type PropsType = {
  bookId: number;
};

export const DeleteFromCartButton: FC<PropsType> = ({ bookId }) => {
  const router = useRouter();

  const handleDeleteFromCart = async () => {
    const res = await deleteFromCart(bookId);
    if (res.data?.message) {
      toast.success(res.data.message);
      router.refresh();
    } else if (res.error?.message) {
      toast.error(res.error.message);
    }
  };

  return (
    <Button className="w-full" onClick={handleDeleteFromCart}>
      Удалить из корзины
    </Button>
  );
};
