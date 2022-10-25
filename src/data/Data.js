import { FiHome } from "react-icons/fi";
import {
  TbReportAnalytics,
  TbBrandGoogleAnalytics,
  TbBrandProducthunt,
} from "react-icons/tb";
import { BsPeople, BsCashStack } from "react-icons/bs";
import { AiOutlineInbox } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { HiOutlineDocumentText } from "react-icons/hi";

export const SidebarData = [
  {
    icon: FiHome,
    title: "Dashboard",
    link: "/",
  },
  {
    icon: BiCategory,
    title: "Categories",
    link: "/category",
  },
  {
    icon: TbReportAnalytics,
    title: "Orders",
    link: "/order",
  },
  {
    icon: AiOutlineInbox,
    title: "Products",
    link: "/product",
  },
  {
    icon: BsPeople,
    title: "Customers",
    link: "/customer",
  },
  {
    icon: TbBrandGoogleAnalytics,
    title: "Suppliers",
    link: "/supplier",
  },
  {
    icon: TbBrandProducthunt,
    title: "Employees",
    link: "/employee",
  },
];

export const CardsData = [
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    icon: RiMoneyDollarBoxLine,
    series: [
      {
        name: "Sales",
        data: [31, 40, 52, 28, 100, 89, 97],
      },
    ],
  },
  {
    title: "Revenue",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    icon: BsCashStack,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Expenses",
    color: {
      backGround:
        "linear-gradient(rgb(248,212,154) -146.42%, rgb(255,202,113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #f9d59b",
    },
    barValue: 60,
    value: "4,270",
    icon: HiOutlineDocumentText,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 23, 41],
      },
    ],
  },
];
