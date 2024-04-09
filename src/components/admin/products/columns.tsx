"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Products } from "@/data/products";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const columsProducts: ColumnDef<Products>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    accessorKey: "title",
  },
  {
    header: "Descripción",
    accessorKey: "description",
  },
  {
    header: "Estado",
    accessorKey: "status",
  },

  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //   },
  {
    id: "isPopular",
    header: "Popular",
    cell: ({ row }) => (
      <Checkbox
        checked={row.original.isPopular}
        onCheckedChange={(value) => {
          // Aquí puedes manejar el cambio de estado del checkbox.
          // Por ejemplo, puedes llamar a una función para actualizar el estado del producto en tu base de datos.
          console.log(`Producto ${row.original.id} popular: ${value}`);
        }}
        aria-label="Marcar como popular"
      />
    ),
  },
  {
    id: "isActive",
    header: "Activo",
    cell: ({ row }) => (
      <Checkbox
        checked={row.original.isActive}
        onCheckedChange={(value) => {
          // Aquí puedes manejar el cambio de estado del checkbox.
          // Por ejemplo, puedes llamar a una función para actualizar el estado del producto en tu base de datos.
          console.log(`Producto ${row.original.id} activo: ${value}`);
        }}
        aria-label="Marcar como popular"
      />
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
          
              <Link
              className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground  cursor-pointer hover:bg-accent hover:text-accent-foreground"
               href={`/admin/products/edit/${row.original.id}`}>
                Edit
              </Link>

         
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }


  },
];
