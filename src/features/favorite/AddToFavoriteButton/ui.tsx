"use client";

import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";
import toast from "react-hot-toast";
import { addToFavorite } from "./api";

type PropsType = {
  bookId: number;
};

export const AddToFavoriteButton: FC<PropsType> = ({ bookId }) => {
  const router = useRouter();

  const handleAddToFavorite = async () => {
    const res = await addToFavorite(bookId);
    if (res.data?.message) {
      toast.success(res.data.message);
      router.refresh();
    } else if (res.error?.message) {
      toast.error(res.error.message);
    }
  };
  return (
    <Button
      variant={"outline"}
      className="w-full"
      onClick={handleAddToFavorite}
    >
      Добавить в избранное
    </Button>
  );
};
