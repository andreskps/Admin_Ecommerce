"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Products } from "@/data/products";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

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

    accessorKey: "name",
  },
  {
    header: "Descripción",
    accessorKey: "description",
  },
  {
    header: "Estado",
    accessorKey: "status",
  },
  {
    header: "Acciones",
    accessorKey: "actions",
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
    id: "popular",
    header: "Popular",
    cell: ({ row }) => (
      <Checkbox
        checked={row.original.popular}
        onCheckedChange={(value) => {
          // Aquí puedes manejar el cambio de estado del checkbox.
          // Por ejemplo, puedes llamar a una función para actualizar el estado del producto en tu base de datos.
          console.log(`Producto ${row.original.id} popular: ${value}`);
        }}
        aria-label="Marcar como popular"
      />
    ),
    
    

  }

];
