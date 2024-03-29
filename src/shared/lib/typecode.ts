import { Book, Order } from "@prisma/client";

export interface IBookWithAuthor extends Book {
  author: {
    name: string;
  };
}

export interface IBookWithAuthorAndCategory extends IBookWithAuthor {
  category: {
    name: string;
  };
}

export interface IOrderWithAuthorAndItems extends Order {
  user: {
    email: string;
  };
  orderItems: Array<{
    book: Book;
  }>;
}

export interface ISearchedProduct {
  id: number;
  name: string;
  price: number;
}
