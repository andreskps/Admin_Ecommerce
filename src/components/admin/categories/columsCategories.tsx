"use client"

import { Category } from "@/validations/categoySchema";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { CellAction } from "../products/cellAction";
import { deletePet } from "@/lib/api/pets";

export const columsCategories: ColumnDef<Category>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <CellAction
        key={row.original.id}
        link="/admin/categories/edit"
        id={row.original?.id?.toString() || ""}
        onDeleted={deletePet}
      />
    ),
  }
];
