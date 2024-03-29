import React from "react";
import { DataTable } from "@/shared/ui/DataTable";
import { db } from "@/shared/api/db";
import { UserRow } from "@/entities/user/ui/UserRow";

export const UsersTable = async () => {
  const users = await db.user.findMany({
    where: {
      id: {
        not: {
          equals: 1,
        },
      },
    },
  });

  return (
    <DataTable title="Пользователи" fullWidth>
      {users.map((user) => (
        <UserRow user={user} key={user.id} />
      ))}
    </DataTable>
  );
};
