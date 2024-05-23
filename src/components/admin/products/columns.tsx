"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession as getSessionClient } from "next-auth/react";
import { Products } from "@/data/products";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { deleteProduct } from "@/lib/api/products";
import { useToast } from "@/components/ui/use-toast";
import { CellAction } from "./cellAction";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";


function CellComponent({ row, property, label }:any) {
  const updateProduct = useUpdateProduct();

  return (
    <Checkbox
      checked={row.original[property]}
      onCheckedChange={(value) => updateProduct(row.original.id, Boolean(value), property)}
      aria-label={label}
    />
  );
}



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
  // {
  //   header: "Estado",
  //   accessorKey: "status",
  // },
  {
    id: "isPopular",
    header: ({column}) => (
      <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      Popular
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
    ),
    accessorKey: "isPopular",
    cell: ({ row }) => <CellComponent row={row} property="isPopular" label="Marcar como popular" />,
  },
  {
    id: "isNew",
    header: "Nuevos",
    cell: ({ row }) => <CellComponent row={row} property="isNew" label="Marcar como nuevo" />,
  },
  {
    id: "isLowStock",
    header: "Nuevos",
    cell: ({ row }) => <CellComponent row={row} property="isLowStock" label="Marcar como bajo stock" />,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <CellAction
        key={row.original.id}
        link="/admin/products/edit"
        id={row.original.id}
        onDeleted={deleteProduct}
      />
    ),
  },
];

// Este es tu nuevo Hook personalizado
// function useUpdateProduct() {
//   const router = useRouter();

//   return useCallback(
//     async (id: string, value: boolean, property: string) => {
//       const session = await getSessionClient();

//       if (!session || !session.user?.access_token) {
//         throw new Error("No se pudo obtener la sesión o el token de acceso.");
//       }

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${session.user.access_token}`,
//           },
//           body: JSON.stringify({
//             [property]: value,
//           }),
//         }
//       );

//       if (response.ok) {
//         router.refresh();
//       } else {
//         const { error } = await response.json();
//         console.error(error);
//       }

//       console.log(`Producto ${id} ${property}: ${value}`);
//     },
//     [router]
//   );
// }
