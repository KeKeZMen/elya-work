"use client";

import { FC, useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type PropsType = {
  productsCount: number;
};

export const PaginationNav: FC<PropsType> = ({ productsCount }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", String(currentPage));
    let search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
    router.refresh();
  }, [currentPage]);

  return (
    <Pagination className="m-3">
      <PaginationContent>
        <PaginationPrevious
          onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : 0)}
        />
        <PaginationLink
          isActive={0 == currentPage}
          onClick={() => setCurrentPage(0)}
        >
          1
        </PaginationLink>

        <div className="max-w-[120px] overflow-x-hidden">
          <div
            className="shrink-0 flex justify-start items-center"
            style={{
              transform:
                currentPage == 0
                  ? "translateX(0)"
                  : currentPage + 2 >= Math.ceil(productsCount / 10) - 1
                  ? `translateX(-${(Math.ceil(productsCount / 10) - 5) * 40}px)`
                  : `translateX(-${(currentPage - 1) * 40}px)`,
            }}
          >
            {Array.from({ length: Math.ceil(productsCount / 10) }).map(
              (_, i, array) =>
                i !== 0 &&
                i !== array.length - 1 && (
                  <PaginationLink
                    key={i}
                    isActive={i == currentPage}
                    onClick={() => setCurrentPage(i)}
                  >
                    {i + 1}
                  </PaginationLink>
                )
            )}
          </div>
        </div>

        <PaginationLink
          isActive={Math.ceil(productsCount / 10) - 1 == currentPage}
          onClick={() => setCurrentPage(Math.ceil(productsCount / 10) - 1)}
        >
          {Math.ceil(productsCount / 10)}
        </PaginationLink>

        <PaginationNext
          onClick={() =>
            setCurrentPage(
              currentPage + 1 >= Math.ceil(productsCount / 10) - 1
                ? Math.ceil(productsCount / 10) - 1
                : currentPage + 1
            )
          }
        />
      </PaginationContent>
    </Pagination>
  );
};
