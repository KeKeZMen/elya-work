import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { db } from "@/shared/api/db";
import { FilterSelects } from "@/features/sorting/FilterSelects";
import Link from "next/link";
import { PaginationNav } from "@/features/sorting/PaginationNav";
import { BookCard } from "@/entities/book/ui/BookCard";

export const metadata: Metadata = {
  title: "Book`s | Каталог",
};

type SearchParamsType = {
  page: string;
  startCost: string;
  finalCost: string;
  categoryId: string;
  authorId: string;
};

type FilterType = {
  AND: Array<{
    [key: string]: {
      [key: string]: string | number;
    };
  }>;
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  if (Object.values(searchParams).length < 4) {
    redirect(
      "/catalog?page=0&categoryId=all&authorId=all&startCost=0&finalCost=1000"
    );
  }

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
    select: {
      author: {
        select: {
          name: true,
        },
      },
      name: true,
      id: true,
      authorId: true,
      categoryId: true,
      description: true,
      price: true,
      discount: true
    },
  });

  return (
    <main className="md:container pt-20 md:pt-28">
      <div className="flex flex-col md:flex-row">
        <FilterSelects />
        <div className="mt-4 md:mt-0 md:ml-16 md:w-full">
          {books.length > 0 ? (
            <>
              <div className="flex flex-wrap">
                {books.map((book) => (
                  <BookCard book={book} key={book.id} />
                ))}
              </div>
              {books.length > 10 && (
                <PaginationNav productsCount={booksCount} />
              )}
            </>
          ) : (
            <p className="text-3xl self-center justify-self-center text-center">
              Нет совпадений
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
