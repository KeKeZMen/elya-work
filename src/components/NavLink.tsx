"use client";

import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";

interface PropsType extends LinkProps {
  children: ReactNode;
  margin?: string;
  className?: string;
}

export const NavLink: FC<PropsType> = ({ children, className, ...props }) => {
  const { href } = props;
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <Link
      {...props}
      className={clsx(
        className,
        isActive
          ? "bg-[#D19E3A] text-white md:bg-inherit md:text-[#D19E3A]"
          : "bg-white"
      )}
    >
      {children}
    </Link>
  );
};
