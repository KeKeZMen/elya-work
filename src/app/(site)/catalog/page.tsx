import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

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
      "/admin?page=0&categoryId=all&authorId=all&startCost=0&finalCost=1000"
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
  });

  const categories = await db.category.findMany({});

  const authors = await db.author.findMany({});

  return <main className="md:container pt-20 md:pt-24">CatalogPage</main>;
}
