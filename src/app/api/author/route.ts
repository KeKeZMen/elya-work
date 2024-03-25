import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const authors = await db.author.findMany();

  return NextResponse.json(authors);
}
