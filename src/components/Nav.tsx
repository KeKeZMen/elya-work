import React from "react";
import { IoMdPerson } from "react-icons/io";
import { FaBookBookmark } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { BsFillBasket3Fill } from "react-icons/bs";
import Link from "next/link";

const links = [
  {
    title: "Войти",
    link: "",
    icon: <IoMdPerson />,
  },
  {
    title: "Каталог книг",
    link: "/catalog",
    icon: <FaBookBookmark />,
  },
  {
    title: "Избранное",
    link: "",
    icon: <FaHeart />,
  },
  {
    title: "Корзина",
    link: "",
    icon: <BsFillBasket3Fill />,
  },
];

export const Nav = () => {
  return (
    <ul>
      {links.map((link) => (
        <li>
          <Link href={link.link}>
            {link.icon}
            <p>{link.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
