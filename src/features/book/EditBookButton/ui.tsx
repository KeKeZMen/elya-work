"use client";

import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";
import { editBook } from "./lib";
import { useFormState } from "react-dom";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Category, Author, Book } from "@prisma/client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui/select";
import { FC, useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";
import toast from "react-hot-toast";
import { Button } from "@/shared/ui/button";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";

const categoriesFetcher: Fetcher<Array<Category>, string> = (url) =>
  fetch(url).then((res) => res.json());

const authorsFetcher: Fetcher<Array<Author>, string> = (url) =>
  fetch(url).then((res) => res.json());

type PropsType = {
  book: Book;
};

export const EditBookButton: FC<PropsType> = ({ book }) => {
  const router = useRouter();
  const [state, formAction] = useFormState(editBook, null);
  const [selectedCategory, setSelectedCategory] = useState(
    String(book.categoryId)
  );
  const [selectedAuthor, setSelectedAuthor] = useState(String(book.authorId));
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleModal = () => setIsOpenedModal((prev) => !prev);
  const onClose = () => setIsOpenedModal(false);

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
      router.refresh();
    } else if (state?.error?.message) {
      toast.error(state?.error?.message);
    }
    onClose();
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

            <Input
              name="image"
              type="file"
              placeholder="Обложка книги"
              accept="image/jpg"
            />

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

            <Input
              name="discount"
              type="number"
              placeholder="Скидка в %"
              defaultValue={book.discount}
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
