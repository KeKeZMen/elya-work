import React from "react";
import { Metadata } from "next";
import { FavoriteBooks } from "@/widgets/FavoriteBooks";

export const metadata: Metadata = {
  title: "Book`s | Избранное",
};

export default async function FavoritePage() {
  return (
    <main className="md:container pt-20 md:pt-24 flex justify-center">
      <FavoriteBooks />
    </main>
  );
}
