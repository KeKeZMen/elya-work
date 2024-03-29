import { User } from "next-auth";
import React, { FC } from "react";

type PropsType = {
  user: User;
};

export const UserRow: FC<PropsType> = ({ user }) => {
  return (
    <div
      key={user.id}
      className="flex justify-between border-b p-3 last:border-none"
    >
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
};
