"use client";

import { OrderSchema } from "@/validations/orderSchema";
import { ColumnDef } from "@tanstack/react-table";
import React, { useCallback } from "react";
import { CellAction } from "../products/cellAction";
import { getSession as getSessionClient } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";


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
    cell: ({ row }) => {
        const updateOrder = useUpdateOrder();
      
        // Mapea cada estado a un color
        const statusColors = {
          procesando: 'red',
          confirmado: 'green',
          enviado: 'blue',
          entregado: 'purple',
          cancelado: 'gray',
          devuelto: 'yellow',
        };
      
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
      },

      
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
];

function useUpdateOrder() {
  const router = useRouter();
  const { toast } = useToast();

  return useCallback(
    async (id: string, value: string, field: string) => {
      const session = await getSessionClient();

      if (!session || !session.user?.access_token) {
        throw new Error("No se pudo obtener la sesión o el token de acceso.");
      }

      const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.access_token}`,
        },
        body: JSON.stringify({
          [field]: value,
        }),
      });

      
      if (response.ok) {
        toast({
          title: "Success",
          description: "Orden actualizada correctamente",
          className: "bg-green-500 text-white",
        });
        router.push("/admin/orders");
        return;
      }

      toast({
        title: "Error",
        description: "No se pudo actualizar la orden",
        className: "bg-red-500 text-white",
      });
    },
    [router]
  );
}
