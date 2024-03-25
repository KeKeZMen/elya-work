"use client";

import { Dialog, DialogContent, DialogTitle } from "@/lib/ui/dialog";
import { createCategorty } from "./lib";
import { useFormState } from "react-dom";
import { Input } from "@/lib/ui/input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/lib/ui/button";
import { CiSquarePlus } from "react-icons/ci";

export const CreateCategoryButton = () => {
  const [state, formAction] = useFormState(createCategorty, null);
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
      <button onClick={handleModal} className="text-4xl">
        <CiSquarePlus />
      </button>

      <Dialog open={isOpenedModal} onOpenChange={handleModal}>
        <DialogContent className="flex flex-col gap-3">
          <DialogTitle>Создать категорию</DialogTitle>
          <form action={formAction} className="flex flex-col gap-3">
            <Input name="name" type="text" placeholder="Название категории" />

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