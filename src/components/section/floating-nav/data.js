

import { AiFillHome } from "react-icons/ai";

import { MdOutlineRestaurantMenu } from "react-icons/md";

import { RiAdminLine } from "react-icons/ri";

import { AiOutlineCalendar } from "react-icons/ai";

import { MdPermPhoneMsg } from "react-icons/md";

export const data = [
  { id: 1, link: "/", icon: <AiFillHome /> },

  { id: 3, link: "/booking", icon: <AiOutlineCalendar /> },
  { id: 4, link: "/menu", icon: <MdOutlineRestaurantMenu /> },
  { id: 5, link: "/contact", icon: <MdPermPhoneMsg /> },
  { id: 6, link: "/admin", icon: <RiAdminLine /> },
];
