import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrdenDetails } from "@/interfaces/orderDetails.interface";
import { currencyFormat } from "@/lib/currencyFormat";
import React from "react";
import { getServerSession } from "next-auth";
import { getSession } from "@/lib/api/config";
import { authOptions } from "@/lib/authOptions";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderDetailsPage({ params }: Props) {
  const { id } = params;
  const session = await getSession();

  if (!session) {
    return <div>Unauthorized</div>;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${session.user?.access_token}`,
      },
      cache: "no-cache",
    }
  );
  if (response.status === 401) {
    return <div>Unauthorized</div>;
  }
  if (!response.ok) {
    return <div>Order not found</div>;
  }

  const order: OrdenDetails = await response.json();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col md:grid md:grid-cols-6 gap-6">
        <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Productos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px] hidden md:table-cell">
                      Image
                    </TableHead>
                    <TableHead className="max-w-[150px]">Name</TableHead>
                    <TableHead>Attributo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.orderItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="hidden md:table-cell">
                        <img
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={
                            item.productVariant.product.image.url ||
                            "/placeholder.svg"
                          }
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.productVariant.product.name}
                      </TableCell>
                      {item.productVariant.attributes.map(
                        (attribute, attrIndex) => (
                          <React.Fragment key={attrIndex}>
                            <TableCell>{attribute.name}</TableCell>
                            <TableCell>{attribute.value}</TableCell>
                          </React.Fragment>
                        )
                      )}
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{currencyFormat(item.unitPrice)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pago</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* <div className="flex items-center">
              <div>Subtotal</div>
              <div className="ml-auto">$169.00</div>
            </div>
            <div className="flex items-center">
              <div>Discount</div>
              <div className="ml-auto">-$19.00</div>
            </div> */}
              <div className="flex items-center">
                <div>Shipping</div>
                <div className="ml-auto">
                  {currencyFormat(order.priceShipping)}
                </div>
              </div>

              <div className="flex items-center font-medium">
                <div>Total</div>
                <div className="ml-auto">{currencyFormat(order.total)}</div>
              </div>
            </CardContent>
            {/* <CardFooter className="flex items-center gap-2">
            <Button size="sm">Collect payment</Button>
            <Button size="sm" variant="outline">
              Send invoice
            </Button>
          </CardFooter> */}
          </Card>
        </div>
        <div className="md:col-span-2 lg:col-span-3 xl:col-span-2 flex flex-col gap-6">
          <Card>
            <div>
              <CardHeader className="flex flex-row items-center space-y-0">
                <CardTitle>Detalles de la orden</CardTitle>
                {/* <Button className="ml-auto" variant="secondary">
                Edit
              </Button> */}
              </CardHeader>
              <CardContent className="text-sm">
                <div className="grid gap-1">
                  <div className="font-bold">Orden: #{order.id}</div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {order.name} {order.lastName}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    Mascoota: {order.namePet}
                  </div>

                  <div className="text-gray-500 dark:text-gray-400">
                    Estado: {order.orderStatus}
                  </div>

                  <div className="text-gray-500 dark:text-gray-400">
                    Método de pago: {order.paymentMethod}
                  </div>

                  <div className="text-gray-500 dark:text-gray-400">
                    Creado: {new Date(order.createdAt).toDateString()}
                  </div>
                </div>
              </CardContent>
            </div>

            <div>
              <CardHeader>
                <CardTitle>Contacto</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="grid gap-1">
                  <div className="font-bold">{order.email}</div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {order.phone}
                  </div>
                </div>
              </CardContent>
            </div>

            <div>
              <CardHeader>
                <CardTitle>Dirección</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div>
                  {order.orderAddress.address}
                  <br />
                  {order.orderAddress.municipio.name},{" "}
                  {order.orderAddress.municipio.state.name}
                  <br />
                  {order.orderAddress.instructions}
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
