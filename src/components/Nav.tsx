import React, { FC } from "react";
import { FaBookBookmark } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { BsFillBasket3Fill } from "react-icons/bs";
import { NavLink } from "./NavLink";

const links = [
  {
    title: "Каталог книг",
    link: "/catalog",
    icon: <FaBookBookmark />,
  },
  {
    title: "Избранное",
    link: "/favorite",
    icon: <FaHeart />,
  },
  {
    title: "Корзина",
    link: "/cart",
    icon: <BsFillBasket3Fill />,
  },
];

type PropsType = {
  onClick?: () => void;
};

export const Nav: FC<PropsType> = ({ onClick }) => {
  return (
    <ul className="flex justify-between flex-col md:flex-row">
      {links.map((link, i) => (
        <NavLink
          href={link.link}
          className="flex items-center p-6 border-b-2 border-[#949494] md:bg-inherit md:border-0 md:flex-col md:p-3"
          key={i}
          onClick={onClick}
        >
          <p className="text-2xl mr-[30px] text-nowrap md:text-center md:m-0">
            {link.icon}
          </p>
          <p className="text-nowrap">{link.title}</p>
        </NavLink>
      ))}
    </ul>
  );
};
