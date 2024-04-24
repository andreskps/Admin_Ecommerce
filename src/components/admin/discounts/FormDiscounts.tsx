"use client";
import { Discount, discountSchema } from "@/validations/discountSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createDiscount,updateDiscount } from "@/lib/api/discounts";

interface Props {
  discount?: Discount;
}

export const FormDiscounts = ({ discount }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<Discount>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      ...discount,

      // expiresAt: discount ? formatISO(new Date(product.expiresAt), { representation: 'date' }) : null,
    },
  });

  async function onSubmit(values: z.infer<typeof discountSchema>) {
    try {
      const response = discount ? await updateDiscount(values) : await createDiscount(values);

      if (!response.ok) {
        toast({
          title: "Error",
          description: "Ocurrió un error al crear el descuento",
          className: "bg-red-500 text-white",
        });
        return;
      }

      toast({
        title: "Descuento creado",
        description: "El descuento se creó correctamente",
        className: "bg-green-500 text-white",
      });

      router.refresh();
      router.push("/admin/discounts");
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al crear el descuento",
        className: "bg-red-500 text-white",
      });
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle>
          {discount ? "Editar descuento" : "Crear descuento"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          {JSON.stringify(form.formState.errors)}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="text-sm" htmlFor="name">
                    Nombre
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del producto" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="percentage"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="text-sm" htmlFor="percentage">
                    Porcentaje
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Porcentaje de descuento"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)} // Convierte el valor a un número
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startsAt"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="text-sm" htmlFor="startsAt">
                    Inicia en
                  </FormLabel>
                  <FormControl>
                    <Input
                      value={
                        field?.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      type="date"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiresAt"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="text-sm" htmlFor="expiresAt">
                    Expira en
                  </FormLabel>
                  <FormControl>
                    <Input
                      value={
                        field?.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      type="date"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {discount ? "Editar descuento" : "Crear descuento"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
