/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Z7dVYLskZcr
 */
import Link from "next/link";

import { FaHome } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import { SidebarItem } from "./SidebarItem";

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
    icon: <AiOutlineBarChart />,
    subLinks: [
      {
        title: "Lista de Productos",
        path: "/admin/products",
      },
      {
        title: "Categorias",
        path: "/categorias",
      },
    ],
  },
  {
    title: "Ventas",
    icon: <AiOutlineBarChart />,
    subLinks: [
      {
        title: "Lista de Ventas",
        path: "/ventas",
      },
    ],
  },
  {
    title: "Clientes",
    icon: <AiOutlineBarChart />,
    path: "/clientes",
  },
];

export function Sidebar() {
  return (
    <div>
      <div className=" duration-300 transform  fixed top-0 start-0 bottom-0  w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex h-[60px] items-center px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            {/* <Package2Icon className="h-6 w-6" /> */}
            <span className="">Petlify</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto">
          <nav className="flex flex-col gap-1 px-4 text-sm font-medium">
            {menuItems.map((item) => (
              <>
                <SidebarItem {...item
            
                } />
              </>
            ))}
        
          </nav>
        </div>
      </div>
    </div>
  );
}
