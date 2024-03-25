"use client";

import { Dialog, DialogContent, DialogTitle } from "@/lib/ui/dialog";
import { createBook } from "./lib";
import { useFormState } from "react-dom";
import { Input } from "@/lib/ui/input";
import { Textarea } from "@/lib/ui/textarea";
import { Category, Author } from "@prisma/client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/lib/ui/select";
import { useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";
import toast from "react-hot-toast";
import { Button } from "@/lib/ui/button";
import { CiSquarePlus } from "react-icons/ci";

const categoriesFetcher: Fetcher<Array<Category>, string> = (url) =>
  fetch(url).then((res) => res.json());

const authorsFetcher: Fetcher<Array<Author>, string> = (url) =>
  fetch(url).then((res) => res.json());

export const CreateBookButton = () => {
  const [state, formAction] = useFormState(createBook, null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
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
      <button onClick={handleModal} className="text-4xl">
        <CiSquarePlus />
      </button>

      <Dialog open={isOpenedModal} onOpenChange={handleModal}>
        <DialogContent className="flex flex-col gap-3">
          <DialogTitle>Создать книгу</DialogTitle>
          <form
            action={(formData) => {
              formData.append("categoryId", selectedCategory);
              formData.append("authorId", selectedAuthor);
              formAction(formData);
            }}
            className="flex flex-col gap-3"
          >
            <Input name="name" type="text" placeholder="Название книги" />

            <Input name="image" type="file" placeholder="Обложка книги" />

            <Textarea name="description" placeholder="Описание книги" />

            <Input
              name="price"
              type="number"
              placeholder="Стоимость книги в ₽"
            />

            {!isLoadingCategories && (
              <Select onValueChange={(val) => setSelectedCategory(val)}>
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
              <Select onValueChange={(val) => setSelectedAuthor(val)}>
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
                Создать
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
