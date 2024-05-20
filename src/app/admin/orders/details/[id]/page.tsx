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
import { currencyFormat } from "@/lib/currencyFormat";
import React from "react";

export default function OrderDetailsPage() {
  const testOrder = {
    name: "valeria",
    lastName: "ochoa",
    phone: "3225910259",
    email: "vale@gmail.com",
    namePet: "Mia",
    priceShipping: 2000,
    total: 93800,
    orderStatus: "confirmado",
    paymentMethod: "Pago contra entrega",
    createdAt: "2024-05-15T18:30:34.292Z",
    orderAddress: {
      address: "calle 80",
      neighborhood: "",
      instructions: "casa 101",
      municipio: {
        name: "Bello",
        state: {
          name: "Antioquia",
        },
      },
    },
    orderItems: [
      {
        quantity: 1,
        unitPrice: 18000,
        productVariant: {
          product: {
            name: "Cuido Gato Agility",
            image: {
              url: "http://res.cloudinary.com/dftvxcvfw/image/upload/v1713530420/products/ahbeokk5ochsui7buuof.jpg",
            },
          },
          attributes: [
            {
              name: "size",
              value: "2kg",
            },
          ],
        },
      },
      {
        quantity: 5,
        unitPrice: 36000,
        productVariant: {
          product: {
            name: "Chunky Adulto Vida Activa",
            image: {
              url: "http://res.cloudinary.com/dftvxcvfw/image/upload/v1713530420/products/ahbeokk5ochsui7buuof.jpg",
            },
          },
          attributes: [
            {
              name: "size",
              value: "2kg",
            },
          ],
        },
      },
    ],
  };

  // Ahora puedes usar este objeto para hacer pruebas

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col md:grid md:grid-cols-6 gap-6">
        <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
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
                    <TableHead>Total</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testOrder.orderItems.map((item, index) => (
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
              <CardTitle>Payment</CardTitle>
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
                <div className="ml-auto">{
                  currencyFormat(testOrder.priceShipping)}
                </div>
              </div>

              <div className="flex items-center font-medium">
                <div>Total</div>
                <div className="ml-auto">{  currencyFormat(testOrder.total) }</div>
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
                <CardTitle>Cliente</CardTitle>
                {/* <Button className="ml-auto" variant="secondary">
                Edit
              </Button> */}
              </CardHeader>
              <CardContent className="text-sm">
                <div className="grid gap-1">
                  <div className="font-bold ">
                    {testOrder.name} {testOrder.lastName}
                  </div>
                </div>
              </CardContent>
            </div>

            <div>
              <CardHeader>
                <CardTitle>Contact information</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="grid gap-1">
                  <div className="font-bold">{testOrder.email}</div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {testOrder.phone}
                  </div>
                </div>
              </CardContent>
            </div>

            <div>
              <CardHeader>
                <CardTitle>Shipping address</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div>
                  {testOrder.orderAddress.address}
                  <br />
                  {testOrder.orderAddress.municipio.name},{" "}
                  {testOrder.orderAddress.municipio.state.name}
                  <br />
                  {testOrder.orderAddress.instructions}
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
