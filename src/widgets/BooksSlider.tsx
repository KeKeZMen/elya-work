"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FC } from "react";

import "swiper/css";
import { BookCard } from "@/entities/book/ui/BookCard";
import { IBookWithAuthorAndCategory } from "@/shared/lib/typecode";
import { useWindowSize } from "@/shared/lib/useWindowSize";

type PropsType = {
  books: Array<IBookWithAuthorAndCategory>;
};

export const BooksSlider: FC<PropsType> = ({ books }) => {
  const { width } = useWindowSize();

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={width ? (width >= 768 ? 6 : 2) : 6}
      style={{ width: "100%" }}
    >
      {books.map((book) => (
        <SwiperSlide key={book.id}>
          <BookCard book={book} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
