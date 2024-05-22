import Link from "next/link";
import React from "react";
import { FaBook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#3F3F3F] w-full mt-4">
      <div className="flex flex-col gap-5 md:container md:flex-row text-white p-10 justify-between items-center">
        <ul className="flex flex-col gap-5 md:gap-1">
          <li>О компании</li>
          <li>Публичная оферта</li>
          <li>Политика обработки данных</li>
          <li>Служба поддержки</li>
        </ul>
        <div className="flex flex-col items-center gap-3">
          <Link
            href={"/"}
            className="flex items-center gap-2 text-5xl text-white"
          >
            <FaBook />
            <h1>Book`s</h1>
          </Link>
          <p>ООО”Букс” 2024 г.</p>
        </div>
      </div>
    </footer>
  );
}
