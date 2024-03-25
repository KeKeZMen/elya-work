"use client";

import AuthForm from "./AuthForm";
import { Dialog, DialogContent } from "@/lib/ui/dialog";
import { useCallback, useState } from "react";
import { IoMdPerson } from "react-icons/io";

export const LoginButton = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleDropdown = useCallback(() => {
    setIsOpened((prev) => !prev);
  }, []);

  return (
    <>
      <button onClick={handleDropdown} className="flex items-center flex-col p-3">
        <IoMdPerson className="text-2xl hidden md:block" />
        Войти
      </button>

      <Dialog open={isOpened} onOpenChange={handleDropdown}>
        <DialogContent>
          <AuthForm onClose={handleDropdown} />
        </DialogContent>
      </Dialog>
    </>
  );
};
