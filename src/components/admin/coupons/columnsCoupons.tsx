"use client"

import { Coupon } from "@/validations/couponSchema";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { CellAction } from "../products/cellAction";
import { deleteBrand } from "@/lib/api/brands";

export const columnsCoupons: ColumnDef<Coupon>[] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Code",
        accessorKey: "code",
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
                link="/admin/coupons/edit"
                id={row.original?.id?.toString() || ""}
                onDeleted={deleteBrand}
            />
        ),

    }
]
