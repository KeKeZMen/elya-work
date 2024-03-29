import { IoIosArrowDown } from "react-icons/io";
import { Metadata } from "next";
import { db } from "@/shared/api/db";
import { BooksSlider } from "@/widgets/BooksSlider";

export const metadata: Metadata = {
  title: "Book`s | Главная",
};

export default async function Home() {
  const discountedBooks = await db.book.findMany({
    where: {
      discount: {
        gt: 0,
      },
    },
    select: {
      author: {
        select: {
          name: true,
        },
      },
      name: true,
      id: true,
      description: true,
      category: {
        select: {
          name: true,
        },
      },
      price: true,
      authorId: true,
      categoryId: true,
      discount: true,
    },
    take: 15,
  });

  const books = await db.book.findMany({
    skip: 15,
    select: {
      author: {
        select: {
          name: true,
        },
      },
      name: true,
      id: true,
      description: true,
      category: {
        select: {
          name: true,
        },
      },
      price: true,
      authorId: true,
      categoryId: true,
      discount: true,
    },
  });

  const categories = await db.category.findMany();

  return (
    <>
      <div className="h-[100dvh] bg-header bg-no-repeat bg-center bg-cover pt-14 flex flex-col justify-between md:items-center">
        <div className="max-w-[973px] flex flex-col items-end mx-5 md:mx-0 text-white text-3xl italic mt-[194px] md:items-center">
          <p className="">
            "Книга - лучший друг. Друзья должны быть выбраны тщательно, книги -
            не так ли."
          </p>
          <p className="self-end">Эмиль Золя</p>
        </div>

        <div className="text-white flex flex-col items-center">
          <p>Погрузится в удивительный мир книг</p>
          <a className="text-4xl" href="/#main">
            <IoIosArrowDown />
          </a>
        </div>
      </div>

      <main className="md:container" id="main">
        <section className="flex flex-col gap-3">
          <h2 className="text-left font-bold text-3xl">Скидки дня</h2>
          <BooksSlider books={discountedBooks} />
        </section>

        <section>
          <h2 className="text-left font-bold text-3xl">Популярное</h2>
          <BooksSlider books={books} />
        </section>
      </main>
    </>
  );
}
