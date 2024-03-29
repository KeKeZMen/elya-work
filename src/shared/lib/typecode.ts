import { Book } from "@prisma/client";

export interface IBookWithAuthor extends Book {
  author: {
    name: string;
  };
}
