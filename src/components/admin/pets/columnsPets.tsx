"use client"

import { Pet } from "@/validations/petSchema";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { CellAction } from "../products/cellAction";
import { deletePet } from "@/lib/api/pets";

export const columsPets: ColumnDef<Pet>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Estado",
    accessorKey: "isActive",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <CellAction
        key={row.original.id}
        link="/admin/brands/edit"
        id={row.original?.id?.toString() || ""}
        onDeleted={deletePet}
      />
    ),
  }
];
