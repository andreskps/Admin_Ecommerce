"use client"

import { Brand } from "@/validations/brandSchema";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { CellAction } from "../products/cellAction";
import { deleteBrand } from "@/lib/api/brands";

export const columsBrands: ColumnDef<Brand>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <CellAction
          key={row.original.id}
          link="/admin/brands/edit"
          id={row.original?.id?.toString() || ""}
          onDeleted={deleteBrand}
        />
      ),

  }
];
