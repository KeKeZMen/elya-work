import { db } from "@/shared/api/db";
import { NextResponse } from "next/server";

export async function GET() {
  const authors = await db.author.findMany();

  return NextResponse.json(authors);
}
