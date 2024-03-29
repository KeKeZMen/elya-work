import { BookRow } from "@/entities/book/ui/BookRow";
import { CreateBookButton } from "@/features/book/CreateBookButton/ui";
import { DeleteBookButton } from "@/features/book/DeleteBookButton/ui";
import { EditBookButton } from "@/features/book/EditBookButton/ui";
import { FilterSelects } from "@/features/sorting/FilterSelects";
import { PaginationNav } from "@/features/sorting/PaginationNav";
import { db } from "@/shared/api/db";
import { DataTable } from "@/shared/ui/DataTable";
import React, { FC } from "react";

type FilterType = {
  AND: Array<{
    [key: string]: {
      [key: string]: string | number;
    };
  }>;
};

type SearchParamsType = {
  page: string;
  startCost: string;
  finalCost: string;
  categoryId: string;
  authorId: string;
};

type PropsType = {
  searchParams: SearchParamsType;
};

export const BooksTable: FC<PropsType> = async ({ searchParams }) => {
  const where: FilterType = {
    AND: [
      {
        price: {
          gt: Number(searchParams.startCost),
        },
      },
      {
        price: {
          lte: Number(searchParams.finalCost),
        },
      },
    ],
  };

  if (searchParams.categoryId !== "all") {
    where.AND.push({
      categoryId: {
        equals: Number(searchParams.categoryId),
      },
    });
  }

  if (searchParams.authorId !== "all") {
    where.AND.push({
      authorId: {
        equals: Number(searchParams.authorId),
      },
    });
  }

  const booksCount = await db.book.count({
    where,
  });

  const books = await db.book.findMany({
    take: 10,
    skip: Number(searchParams.page) * 10,
    where,
  });

  return (
    <div className="flex flex-col justify-between gap-3 md:flex-row">
      <div className="flex flex-col rounded-md md:w-full">
        <DataTable addButton={<CreateBookButton />} title="Книги" fullWidth>
          {books.map((book) => (
            <BookRow
              book={book}
              deleteButton={<DeleteBookButton bookId={book.id} />}
              editButton={<EditBookButton book={book} />}
              key={book.id}
            />
          ))}
        </DataTable>
        {booksCount > 10 && (
          <div className="border-t">
            <PaginationNav productsCount={booksCount} />
          </div>
        )}
      </div>
      <FilterSelects />
    </div>
  );
};
