import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { FilterSelects } from "@/components/FilterSelects";
import Link from "next/link";
import { PaginationNav } from "@/components/PaginationNav";

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
      image: true,
      id: true,
    },
  });

  return (
    <main className="md:container pt-20 md:pt-28">
      <div className="flex flex-col md:flex-row">
        <FilterSelects />
        <div className="ml-16 md:w-full">
          {books.length > 0 ? (
            <>
              <div className="flex flex-wrap">
                {books.map((book) => (
                  <Link
                    href={`/book/${book.id}`}
                    key={book.id}
                    className="w-[160px] flex flex-col gap-[2px]"
                  >
                    <img src={book.image} alt="" className="rounded-md" />
                    <h2 className="text-xl font-bold">{book.name}</h2>
                    <p>{book.author.name}</p>
                  </Link>
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
