import { authOptions } from "@/shared/api/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CategoriesTable } from "@/widgets/CategoriesTable";
import { AuthorsTable } from "@/widgets/AuthorsTable";
import { UsersTable } from "@/widgets/UsersTable";
import { OrdersTable } from "@/widgets/OrdersTable";
import { BooksTable } from "@/widgets/BooksTable";

type SearchParamsType = {
  page: string;
  startCost: string;
  finalCost: string;
  categoryId: string;
  authorId: string;
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const session = await getServerSession(authOptions);
  if (session?.user?.id !== 1) return redirect("/");

  if (Object.values(searchParams).length < 4) {
    redirect(
      "/admin?page=0&categoryId=all&authorId=all&startCost=0&finalCost=10000"
    );
  }

  return (
    <main className="md:container pt-20 md:pt-[100px]">
      <BooksTable searchParams={searchParams} />

      <div className="flex flex-col gap-3 justify-between mt-3 mb-3 md:flex-row">
        <CategoriesTable />
        <AuthorsTable />
      </div>

      <UsersTable />
      <OrdersTable />
    </main>
  );
}
