import { ISearchedProduct } from "@/shared/lib/typecode";

export const getSearchedProducts = async (searchTerm?: string) => {
  if (searchTerm) {
    try {
      const res = await fetch(`/api/book/search/${searchTerm}`);
      return res.json() as Promise<Array<ISearchedProduct>>;
    } catch (e) {
      return [] as Array<ISearchedProduct>;
    }
  } else {
    return [] as Array<ISearchedProduct>;
  }
};
