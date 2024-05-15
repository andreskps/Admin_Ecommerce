"use client"

import { OrderSchema } from "@/validations/orderSchema";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { CellAction } from "../products/cellAction";


export const columnsOrders: ColumnDef<OrderSchema>[] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Email",
        accessorKey: "email",
    },
    {
        header: "Phone",
        accessorKey: "phone",
    },
    {
        header: "Name",
        accessorKey: "name",
    },
    {
        header: "Last Name",
        accessorKey: "lastName",
    },
    {
        header: "Name Pet",
        accessorKey: "namePet",
    },
    {
        header: "Total Amount",
        accessorKey: "totalAmount",
    },
    {
        header: "Is Paid",
        accessorKey: "isPaid",
        cell: ({ cell }) => (
            <div style={{ color: cell.row.original.isPaid ? 'green' : 'red' }}>
                {cell.row.original.isPaid ? 'Paid' : 'Not Paid'}
            </div>
        ),
    },
    {
        header: "Order Status",
        accessorKey: "orderStatus",
    },
    {
        header: "Payment Method",
        accessorKey: "paymentMethod",
    },
    {
        header: "Created At",
        accessorKey: "createdAt",
    },
    {
        header: "Updated At",
        accessorKey: "updatedAt",
    },
    // {
    //     id: "actions",
    //     header: "",
    //     cell: ({ row }) => (
    //         <CellAction
    //             key={row.original.id}
    //             link="/admin/orders/edit"
    //             id={row.original?.id?.toString() || ""}
    //             onDeleted={deleteBrand}
    //         />
    //     ),

    // }
]