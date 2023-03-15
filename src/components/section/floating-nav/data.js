/** @format */

import { AiFillHome } from "react-icons/ai";
// import {BsPersonFill} from 'react-icons/bs'
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";

import { AiOutlineCalendar } from "react-icons/ai";

import { MdPermPhoneMsg } from "react-icons/md";

export const data = [
  { id: 1, link: "/", icon: <AiFillHome /> },
  // {id: 2, link: '/about', icon: <BsPersonFill/>},
  { id: 3, link: "/booking", icon: <AiOutlineCalendar /> },
  { id: 4, link: "/menu", icon: <MdOutlineRestaurantMenu /> },
  { id: 5, link: "/contact", icon: <MdPermPhoneMsg /> },
  { id: 6, link: "/admin", icon: <RiAdminLine /> },
];
