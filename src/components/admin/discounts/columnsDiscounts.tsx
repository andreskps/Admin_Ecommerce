"use client"

import { Discount } from "@/validations/discountSchema";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { CellAction } from "../products/cellAction";
import { deleteBrand } from "@/lib/api/brands";

export const columsDiscounts: ColumnDef<Discount>[] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Name",
        accessorKey: "name",
    },
    {
        header: "Percentage",
        accessorKey: "percentage",
    },
    {
        header: "Starts At",
        accessorKey: "startsAt",
    },
    {
        header: "Expires At",
        accessorKey: "expiresAt",
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => (
            <CellAction
                key={row.original.id}
                link="/admin/discounts/edit"
                id={row.original?.id?.toString() || ""}
                onDeleted={deleteBrand}
            />
        ),

    }
]
