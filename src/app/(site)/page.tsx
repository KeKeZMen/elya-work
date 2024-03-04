import { IoIosArrowDown } from "react-icons/io";

export default function Home() {
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

      <main className="md:container h-[100dvh]" id="main">
        <section></section>
      </main>
    </>
  );
}
