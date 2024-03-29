"use client";

import { FC, useState } from "react";
import { deleteBook } from "./lib";
import { DeleteConfirm } from "@/shared/ui/DeletionConfirm";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type PropsType = {
  bookId: number;
};

export const DeleteBookButton: FC<PropsType> = ({ bookId }) => {
  const router = useRouter();
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleModal = () => setIsOpenedModal((prev) => !prev);
  const onClose = () => setIsOpenedModal(false);

  const handleDelete = async () => {
    const res = await deleteBook(bookId);
    if (res.data?.message) {
      toast.success(res.data.message);
      router.refresh();
    } else if (res.error?.message) {
      toast.error(res.error.message);
    }
    onClose();
  };

  return (
    <>
      <button className="text-2xl" onClick={handleModal}>
        <RxCross1 />
      </button>

      <Dialog open={isOpenedModal} onOpenChange={handleModal}>
        <DialogContent>
          <DeleteConfirm onClose={handleModal} onDelete={handleDelete} />
        </DialogContent>
      </Dialog>
    </>
  );
};
