"use client";

import { FC, useState } from "react";
import { deleteCategory } from "./lib";
import { DeleteConfirm } from "@/lib/ui/DeletionConfirm";
import { Dialog, DialogContent } from "@/lib/ui/dialog";
import { RxCross1 } from "react-icons/rx";

type PropsType = {
  categoryId: number;
};

export const DeleteCategoryButton: FC<PropsType> = ({ categoryId }) => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleModal = () => setIsOpenedModal((prev) => !prev);

  const handleDelete = async () => {
    await deleteCategory(categoryId);
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
