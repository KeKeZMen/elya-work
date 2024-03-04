"use client";

import AuthForm from "./AuthForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCallback, useState } from "react";

export const LoginButton = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleDropdown = useCallback(() => {
    setIsOpened((prev) => !prev);
  }, []);

  return (
    <>
      <button onClick={handleDropdown} className="flex items-center flex-col">
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
