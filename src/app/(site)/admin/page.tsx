import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.id !== 1) return redirect("/");

  const users = await db.user.findMany({
    where: {
      id: {
        not: {
          equals: 1,
        },
      },
    },
  });

  // const books = await db.

  return <main className="md:container pt-20 md:pt-24"></main>;
}
