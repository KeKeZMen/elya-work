import { ISearchedProduct } from "@/shared/lib/typecode";
import React, { FC } from "react";

type PropsType = {
  book: ISearchedProduct;
};

export const SearchedProduct: FC<PropsType> = ({ book }) => {
  return <div>SearchedProduct</div>;
};
