import { columsProducts } from "@/components/admin/products/columns";
import { DataTable } from "@/components/admin/products/data-table";
import { TableProducts } from "@/components/component/table";
import { products } from "@/data/products";
import Link from "next/link";
import React from "react";


export default function ProducsPage() {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        {/* <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Productos
                </h2>
              </div>

              <div>
                <div className="inline-flex gap-x-2">
                  <Link
                    href="/admin/products/create"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <svg
                      className="flex-shrink-0 size-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                    Agregar producto
                  </Link>
                </div>
              </div>
            </div>
  
          </div>
        </div> */}

        {/* <TableProducts /> */}
        <DataTable columns={columsProducts} data={products} />
      </div>
    </div>
  );
}
