import { db } from "@/shared/api/db";
import { authOptions } from "@/shared/api/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FilterSelects } from "@/features/sorting/FilterSelects";
import { PaginationNav } from "@/features/sorting/PaginationNav";
import { CreateCategoryButton } from "@/features/category/CreateCategoryButton/ui";
import { CreateAuthorButton } from "@/features/author/CreateAuthorButton/ui";
import { CreateBookButton } from "@/features/book/CreateBookButton/ui";
import { DeleteBookButton } from "@/features/book/DeleteBookButton/ui";
import { DeleteAuthorButton } from "@/features/author/DeleteAuthorButton/ui";
import { DeleteCategoryButton } from "@/features/category/DeleteCategoryButton/ui";
import { EditBookButton } from "@/features/book/EditBookButton/ui";
import { EditCategoryButton } from "@/features/category/EditCategoryButton/ui";
import { EditAuthorButton } from "@/features/author/EditAuthorButton/ui";
import { CategoryRow } from "@/entities/category/ui/CategoryRow";
import { CategoriesTable } from "@/widgets/CategoriesTable";

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

export default async function AdminPage({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const session = await getServerSession(authOptions);
  if (session?.user?.id !== 1) return redirect("/");

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

  const users = await db.user.findMany({
    where: {
      id: {
        not: {
          equals: 1,
        },
      },
    },
  });

  const orders = await db.order.findMany({
    select: {
      id: true,
      isSuccess: true,
      user: {
        select: {
          email: true,
        },
      },
      orderItems: {
        select: {
          book: true,
        },
      },
    },
  });

  const booksCount = await db.book.count({
    where,
  });

  const books = await db.book.findMany({
    take: 10,
    skip: Number(searchParams.page) * 10,
    where,
  });

  const authors = await db.author.findMany({});

  return (
    <main className="md:container pt-20 md:pt-[100px]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col justify-between gap-3 md:flex-row">
          <div className="flex flex-col border rounded-md md:w-full">
            <div className="flex justify-between items-center p-3">
              <h2 className="text-4xl">Книги</h2>
              <CreateBookButton />
            </div>

            <div className="flex flex-col border-t h-[300px]">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="flex justify-between border-b last:border-none p-3"
                >
                  <p>{book.name}</p>
                  <div className="flex gap-3">
                    <EditBookButton book={book} />
                    <DeleteBookButton bookId={book.id} />
                  </div>
                </div>
              ))}
            </div>
            {booksCount > 10 && (
              <div className="border-t">
                <PaginationNav productsCount={booksCount} />
              </div>
            )}
          </div>
          <FilterSelects />
        </div>
      </div>

      <div className="flex flex-col gap-3 justify-between mt-3 md:flex-row">
        <CategoriesTable />

        <div className="flex flex-col border rounded-md md:w-[50%]">
          <div className="flex flex-col">
            <div className="flex justify-between items-center border-b p-3">
              <h2 className="text-4xl">Авторы</h2>
              <CreateAuthorButton />
            </div>

            <div className="flex flex-col h-[300px] overflow-y-auto shrink-0">
              {authors.map((author) => (
                <div
                  key={author.id}
                  className="flex justify-between border-b p-3 last:border-none"
                >
                  <p>{author.name}</p>
                  <div className="flex gap-3">
                    <EditAuthorButton author={author} />
                    <DeleteAuthorButton authorId={author.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col border rounded-md w-full mt-3">
        <div className="flex flex-col">
          <div className="flex justify-between items-center border-b p-3">
            <h2 className="text-4xl">Пользователи</h2>
          </div>

          <div className="flex flex-col h-[300px] overflow-y-auto shrink-0">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex justify-between border-b p-3 last:border-none"
              >
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col border rounded-md w-full my-3">
        <div className="flex flex-col">
          <div className="flex justify-between items-center border-b p-3">
            <h2 className="text-4xl">Заказы</h2>
          </div>

          <div className="flex flex-col h-[300px] overflow-y-auto shrink-0">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between border-b p-3 last:border-none"
              >
                <p>{order.user.email}</p>
                <p>
                  {order.orderItems
                    .map((orderItem) => `${orderItem.book.name}`)
                    .join(", ")}
                </p>
                <p>
                  {order.orderItems.reduce(
                    (acc, book) => acc + book.book.price,
                    0
                  )}
                  ₽
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
