import { db } from "@/shared/api/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params?: { bookName: string } }
) {
  const books = await db.book.findMany({
    where: {
      name: {
        contains: params?.bookName,
      },
    },
    select: {
      id: true,
      name: true,
      price: true,
    },
  });

  return NextResponse.json(books);
}
