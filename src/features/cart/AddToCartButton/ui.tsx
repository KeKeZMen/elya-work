"use client";

import { Button } from "@/shared/ui/button";
import { addToCart } from "./lib";
import { FC } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type PropsType = {
  bookId: number;
};

export const AddToOrderButton: FC<PropsType> = ({ bookId }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const res = await addToCart(bookId);
    if (res.data?.message) {
      toast.success(res.data.message);
      router.refresh();
    } else if (res.error?.message) {
      toast.error(res.error.message);
    }
  };

  return (
    <Button className="w-full" onClick={handleAddToCart}>
      Добавить в корзину
    </Button>
  );
};
