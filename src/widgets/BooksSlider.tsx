"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FC } from "react";

import "swiper/css";
import { useWindowSize } from "@/shared/lib/useWindowSize";
import { BookCard } from "@/entities/book/ui/BookCard";
import { IBookWithAuthorAndCategory } from "@/shared/lib/typecode";

type PropsType = {
  books: Array<IBookWithAuthorAndCategory>;
};

export const BooksSlider: FC<PropsType> = ({ books }) => {
  const { width } = useWindowSize();

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={width ? (width >= 768 ? 3 : 1) : 1}
    >
      {books.map((book) => (
        <SwiperSlide key={book.id}>
          <BookCard book={book} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
