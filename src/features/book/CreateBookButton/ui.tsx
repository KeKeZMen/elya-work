"use client";

import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";
import { createBook } from "./lib";
import { useFormState } from "react-dom";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Category, Author } from "@prisma/client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui/select";
import { useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";
import toast from "react-hot-toast";
import { Button } from "@/shared/ui/button";
import { CiSquarePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";

const categoriesFetcher: Fetcher<Array<Category>, string> = (url) =>
  fetch(url).then((res) => res.json());

const authorsFetcher: Fetcher<Array<Author>, string> = (url) =>
  fetch(url).then((res) => res.json());

export const CreateBookButton = () => {
  const router = useRouter();
  const [state, formAction] = useFormState(createBook, null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
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
            <Input
              name="name"
              type="text"
              placeholder="Название книги"
              required
            />

            <Input
              name="image"
              type="file"
              placeholder="Обложка книги"
              accept="image/jpg"
              required
            />

            <Textarea
              name="description"
              placeholder="Описание книги"
              required
            />

            <Input
              name="price"
              type="number"
              placeholder="Стоимость книги в ₽"
              required
            />

            <Input
              required
              name="discount"
              type="number"
              placeholder="Скидка в %"
            />

            {!isLoadingCategories && (
              <Select
                onValueChange={(val) => setSelectedCategory(val)}
                required
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
              <Select required onValueChange={(val) => setSelectedAuthor(val)}>
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
