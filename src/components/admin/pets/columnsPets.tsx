import { Pet } from "@/validations/petSchema";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

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
];
