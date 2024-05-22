import React from "react";
import { DataTable } from "@/shared/ui/DataTable";
import { db } from "@/shared/api/db";
import { CreateCategoryButton } from "@/features/category/CreateCategoryButton/ui";
import { CategoryRow } from "@/entities/category/ui/CategoryRow";
import { DeleteCategoryButton } from "@/features/category/DeleteCategoryButton/ui";
import { EditCategoryButton } from "@/features/category/EditCategoryButton/ui";

export const CategoriesTable = async () => {
  const categories = await db.category.findMany({});

  return (
    <DataTable title="Жанры" addButton={<CreateCategoryButton />}>
      {categories.map((category) => (
        <CategoryRow
          key={category.id}
          category={category}
          editButton={<EditCategoryButton category={category} />}
          deleteButton={<DeleteCategoryButton categoryId={category.id} />}
        />
      ))}
    </DataTable>
  );
};
