"use client";

import { Dialog, DialogContent, DialogTitle } from "@/lib/ui/dialog";
import { editCategory } from "./lib";
import { useFormState } from "react-dom";
import { Input } from "@/lib/ui/input";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/lib/ui/button";
import { FaRegEdit } from "react-icons/fa";
import { Category } from "@prisma/client";

type PropsType = {
  category: Category;
};

export const EditCategoryButton: FC<PropsType> = ({ category }) => {
  const [state, formAction] = useFormState(editCategory, null);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleModal = () => setIsOpenedModal((prev) => !prev);

  useEffect(() => {
    if (state?.data?.message) {
      toast.success(state?.data?.message);
    } else if (state?.error?.message) {
      toast.error(state?.error?.message);
    }
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
            />

            <div className="flex justify-between">
              <Button variant="destructive" type="button" onClick={handleModal}>
                Отменить
              </Button>
              <Button variant="default" type="submit" onClick={handleModal}>
                Создать
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
