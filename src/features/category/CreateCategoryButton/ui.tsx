"use client";

import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";
import { createCategorty } from "./lib";
import { useFormState } from "react-dom";
import { Input } from "@/shared/ui/input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/shared/ui/button";
import { CiSquarePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";

export const CreateCategoryButton = () => {
  const router = useRouter();
  const [state, formAction] = useFormState(createCategorty, null);
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
