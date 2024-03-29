"use client";

import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";
import { editCategory } from "./lib";
import { useFormState } from "react-dom";
import { Input } from "@/shared/ui/input";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/shared/ui/button";
import { FaRegEdit } from "react-icons/fa";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";

type PropsType = {
  category: Category;
};

export const EditCategoryButton: FC<PropsType> = ({ category }) => {
  const router = useRouter();
  const [state, formAction] = useFormState(editCategory, null);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleModal = () => setIsOpenedModal((prev) => !prev);
  const onClose = () => setIsOpenedModal(false);

  useEffect(() => {
    if (state?.data?.message) {
      toast.success(state?.data?.message);
      router.refresh();
    } else if (state?.error?.message) {
      toast.error(state?.error?.message);
    }
    onClose();
  }, [state]);

  return (
    <>
      <button onClick={handleModal} className="text-2xl">
        <FaRegEdit />
      </button>

      <Dialog open={isOpenedModal} onOpenChange={handleModal}>
        <DialogContent className="flex flex-col gap-3">
          <DialogTitle>Отредактировать категорию</DialogTitle>
          <form
            action={(formData) => {
              formData.append("categoryId", String(category.id));
              formAction(formData);
            }}
            className="flex flex-col gap-3"
          >
            <Input
              name="name"
              type="text"
              placeholder="Название категории"
              defaultValue={category.name}
              required
            />

            <Input
              name="image"
              type="file"
              accept="image/jpg"
              placeholder="Фото категории"
              required
            />

            <div className="flex justify-between">
              <Button variant="destructive" type="button" onClick={handleModal}>
                Отменить
              </Button>
              <Button variant="default" type="submit" onClick={handleModal}>
                Отредактировать
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
