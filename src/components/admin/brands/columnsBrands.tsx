import { Brand } from "@/validations/brandSchema";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

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
];
