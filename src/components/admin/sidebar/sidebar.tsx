/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Z7dVYLskZcr
 */
import Link from "next/link";

import { FaHome } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import { SidebarItem } from "./SidebarItem";
import { FaBoxes } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FiDollarSign } from "react-icons/fi";

interface SubMenuItem {
  title: string;
  path: string;
}

interface MenuItem {
  title: string;
  path?: string;
  icon: React.ReactNode;
  subLinks?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: "Inicio",
    path: "/",
    icon: <FaHome />,
  },
  {
    title: "Estadisticas",
    path: "/estadisticas",
    icon: <AiOutlineBarChart />,
  },
  {
    title: "Productos",
    icon: <FaBoxes />,
    subLinks: [
      {
        title: "Lista de Productos",
        path: "/admin/products",
      },
      {
        title: "Categorias",
        path: "/admin/categories",
      },
      {
        title: "Marcas",
        path: "/admin/brands",
      },
      {
        title: "Mascotas",
        path: "/admin/pets",
      }
    ],
  },
  {
    title: "Ventas",
    icon: <FiDollarSign />,
    subLinks: [
      {
        title: "Lista de Ventas",
        path: "/ventas",
      },
    ],
  },
  {
    title: "Clientes",
    icon: <FiUsers />,
    path: "/clientes",
  },
  {
    title: "Ofertas",
    icon: <FiDollarSign />,
    subLinks: [
      {
        title: "Descuentos",
        path: "/admin/discounts",
      },
      {
        title: "Cupones",
        path: "/admin/coupons",
      },
    ],

  }
];

export function Sidebar() {
  return (
    <div  className="relative hidden h-screen border-r pt-16 lg:block w-72">
      <div className=" duration-300 transform  fixed top-0 start-0 bottom-0  w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex h-[60px] items-center px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            {/* <Package2Icon className="h-6 w-6" /> */}
            <span className="">Petlify</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto">
          <nav className="flex flex-col gap-1 px-4 text-sm font-medium" key={"sidebar"}>
            {menuItems.map((item) => (
              <>
                <SidebarItem 
                key={item.title}
                {...item} />
              </>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
