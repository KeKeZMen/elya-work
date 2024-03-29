"use client";

import { useWindowSize } from "@/shared/lib/useWindowSize";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { User } from "next-auth";
import { FC } from "react";
import { IoPerson } from "react-icons/io5";

type PropsType = {
  user: User;
  LogoutButton?: JSX.Element;
};

export const UserProfile: FC<PropsType> = ({ user, LogoutButton }) => {
  const { width } = useWindowSize();
  if (!width) return null;

  return (
    <>
      {width >= 768 ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-col items-center md:p-3">
            <IoPerson className="text-2xl" />
            {user.name}
          </DropdownMenuTrigger>

          <DropdownMenuContent className="z-[101]">
            <DropdownMenuLabel className="font-normal p-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="flex justify-start p-2">
              {LogoutButton}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex w-full justify-between p-3 items-center shrink-0">
          <p className="text-3xl ">
            <IoPerson />
          </p>
          <p>{user.name}</p>
          {LogoutButton}
        </div>
      )}
    </>
  );
};
