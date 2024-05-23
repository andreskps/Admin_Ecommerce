"use client";

import { OrderSchema } from "@/validations/orderSchema";
import { ColumnDef } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { CellAction } from "../products/cellAction";
import { getSession as getSessionClient } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useUpdateOrder } from "@/hooks/useUpdateOrder";



function CellComponent({ row }:any) {
  const updateOrder = useUpdateOrder();

  return (
    <select
      defaultValue={row.original.orderStatus}
      onChange={(e) => {
        updateOrder(row.original.id, e.target.value, "orderStatus");
      }}
      className="border text-green  border-gray-300 rounded-md p-1"
    >
      <option value="procesando">Procesando</option>
      <option value="confirmado">Confirmado</option>
      <option value="enviado">Enviado</option>
      <option value="entregado">Entregado</option>
      <option value="cancelado">Cancelado</option>
      <option value="devuelto">Devuelto</option>
    </select>
  );
}


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
      <div style={{ color: cell.row.original.isPaid ? "green" : "red" }}>
        {cell.row.original.isPaid ? "Paid" : "Not Paid"}
      </div>
    ),
  },
  {
    header: "Order Status",
    accessorKey: "orderStatus",
    cell: ({ row }) => <CellComponent row={row} />,
      
  },
  {
    header: "Payment Method",
    accessorKey: "paymentMethod",
  },
  {
      id: "actions",
      header: "",
      cell: ({ row }) => (
          // <CellAction
          //     key={row.original.id}
          //     link="/admin/orders/edit"
          //     id={row.original?.id?.toString() || ""}
          //     onDeleted={deleteBrand}
          // />
          <Link href={`/admin/orders/details/${row.original.id}`}>
            Ver
          </Link>
      ),

  }
];


