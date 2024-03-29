"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FC } from "react";

import "swiper/css";
import { BookCard } from "@/entities/book/ui/BookCard";
import { IBookWithAuthorAndCategory } from "@/shared/lib/typecode";

type PropsType = {
  books: Array<IBookWithAuthorAndCategory>;
};

export const BooksSlider: FC<PropsType> = ({ books }) => {
  return (
    <Swiper spaceBetween={50} slidesPerView={3}>
      {books.map((book) => (
        <SwiperSlide key={book.id}>
          <BookCard book={book} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
