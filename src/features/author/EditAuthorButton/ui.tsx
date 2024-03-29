"use client";

import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";
import { editAuthor } from "./lib";
import { useFormState } from "react-dom";
import { Input } from "@/shared/ui/input";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/shared/ui/button";
import { FaRegEdit } from "react-icons/fa";
import { Author } from "@prisma/client";
import { useRouter } from "next/navigation";

type PropsType = {
  author: Author;
};

export const EditAuthorButton: FC<PropsType> = ({ author }) => {
  const router = useRouter();
  const [state, formAction] = useFormState(editAuthor, null);
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
          <DialogTitle>Отредактировать автора</DialogTitle>
          <form
            action={(formData) => {
              formData.append("authorId", String(author.id));
              formAction(formData);
            }}
            className="flex flex-col gap-3"
          >
            <Input
              name="name"
              type="text"
              placeholder="Имя автора"
              defaultValue={author.name}
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
