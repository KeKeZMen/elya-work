"use client";

import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";
import toast from "react-hot-toast";
import { deleteFromFavorite } from "./api";

type PropsType = {
  bookId: string;
};

export const DeleteFromFavoriteButton: FC<PropsType> = ({ bookId }) => {
  const router = useRouter();

  const handleDeleteFromFavorite = async () => {
    const res = await deleteFromFavorite(bookId);
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
      onClick={handleDeleteFromFavorite}
    >
      Удалить из избранного
    </Button>
  );
};
