"use client"

import { Banner } from "@/validations/bannerSchema";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { CellAction } from "../products/cellAction";
import { deleteBanner } from "@/lib/api/banner";


export const columnsBanners: ColumnDef<Banner>[] = [
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
            link="/admin/banners/edit"
            id={row.original?.id?.toString() || ""}
            onDeleted={deleteBanner}
          />
        ),
    }
];


