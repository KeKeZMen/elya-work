import React from "react";
import { DataTable } from "@/shared/ui/DataTable";
import { db } from "@/shared/api/db";
import { AuthorRow } from "@/entities/author/ui/AuthorRow";
import { EditAuthorButton } from "@/features/author/EditAuthorButton/ui";
import { DeleteAuthorButton } from "@/features/author/DeleteAuthorButton/ui";
import { CreateAuthorButton } from "@/features/author/CreateAuthorButton/ui";

export const AuthorsTable = async () => {
  const authors = await db.author.findMany();

  return (
    <DataTable title="Авторы" addButton={<CreateAuthorButton />}>
      {authors.map((author) => (
        <AuthorRow
          key={author.id}
          author={author}
          editButton={<EditAuthorButton author={author} />}
          deleteButton={<DeleteAuthorButton authorId={author.id} />}
        />
      ))}
    </DataTable>
  );
};
