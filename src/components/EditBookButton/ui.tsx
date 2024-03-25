"use client";

import { Dialog, DialogContent, DialogTitle } from "@/lib/ui/dialog";
import { editBook } from "./lib";
import { useFormState } from "react-dom";
import { Input } from "@/lib/ui/input";
import { Textarea } from "@/lib/ui/textarea";
import { Category, Author, Book } from "@prisma/client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/lib/ui/select";
import { FC, useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";
import toast from "react-hot-toast";
import { Button } from "@/lib/ui/button";
import { FaRegEdit } from "react-icons/fa";

const categoriesFetcher: Fetcher<Array<Category>, string> = (url) =>
  fetch(url).then((res) => res.json());

const authorsFetcher: Fetcher<Array<Author>, string> = (url) =>
  fetch(url).then((res) => res.json());

type PropsType = {
  book: Book
}

export const EditBookButton: FC<PropsType> = ({ book }) => {
  const [state, formAction] = useFormState(editBook, null);
  const [selectedCategory, setSelectedCategory] = useState(String(book.categoryId));
  const [selectedAuthor, setSelectedAuthor] = useState(String(book.authorId));
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleModal = () => setIsOpenedModal((prev) => !prev);

  const { data: categories, isLoading: isLoadingCategories } = useSWR(
    "/api/category",
    categoriesFetcher
  );

  const { data: authors, isLoading: isLoadingAuthors } = useSWR(
    "/api/author",
    authorsFetcher
  );

  useEffect(() => {
    if (state?.data?.message) {
      toast.success(state?.data?.message);
    } else if (state?.error?.message) {
      toast.error(state?.error?.message);
    }
  }, [state]);

  return (
    <>
      <button onClick={handleModal} className="text-2xl">
        <FaRegEdit />
      </button>

      <Dialog open={isOpenedModal} onOpenChange={handleModal}>
        <DialogContent className="flex flex-col gap-3">
          <DialogTitle>Отредактировать книгу</DialogTitle>
          <form
            action={(formData) => {
              formData.append("categoryId", selectedCategory);
              formData.append("authorId", selectedAuthor);
              formData.append("bookId", String(book.id));
              formAction(formData);
            }}
            className="flex flex-col gap-3"
          >
            <Input
              name="name"
              type="text"
              placeholder="Название книги"
              defaultValue={book.name}
            />

            <Input name="image" type="file" placeholder="Обложка книги" />

            <Textarea
              name="description"
              placeholder="Описание книги"
              defaultValue={book.description}
            />

            <Input
              name="price"
              type="number"
              placeholder="Стоимость книги в ₽"
              defaultValue={book.price}
            />

            {!isLoadingCategories && (
              <Select
                onValueChange={(val) => setSelectedCategory(val)}
                defaultValue={String(book.categoryId)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem
                      value={String(category.id)}
                      className="cursor-pointer"
                      key={category.id}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {!isLoadingAuthors && (
              <Select
                onValueChange={(val) => setSelectedAuthor(val)}
                defaultValue={String(book.authorId)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Автор" />
                </SelectTrigger>
                <SelectContent>
                  {authors?.map((category) => (
                    <SelectItem
                      value={String(category.id)}
                      className="cursor-pointer"
                      key={category.id}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <div className="flex justify-between">
              <Button variant="destructive" type="button" onClick={handleModal}>
                Отменить
              </Button>
              <Button variant="default" type="submit">
                Отредактировать
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
