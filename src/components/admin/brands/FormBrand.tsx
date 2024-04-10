"use client";
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
import { brandSchema } from "@/validations/brandSchema";
import { z } from "zod";

import {useState} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createBrand } from "@/lib/api/brands";

interface Props {
  brand?: z.infer<typeof brandSchema>;
}

export const FormBrand = ({ brand }: Props) => {

  const [loading, setLoading] = useState(false);


  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      ...brand,
    },
  });

 async  function onSubmit(values: z.infer<typeof brandSchema>) {

    if (brand) {
      // Edit brand
      console.log("Edit brand", values);
      return;
    }

    // Create brand
    try {
      const res = await createBrand(values);
      console.log(await res.json());
      if (res.ok) {
        alert("Marca creada correctamente");
        form.reset();
      } else {
        alert("Ocurrió un error al crear la marca");
      }
    } catch (error) {
      alert("Ocurrió un error al crear la marca");


    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle>{brand ? "Editar marca" : "Crear marca"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
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
              name="description"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="text-sm" htmlFor="description">
                    Descripción
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción de la marca"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="text-sm" htmlFor="logo">
                    Url del logo
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="URL" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {brand ? "Editar marca" : "Crear marca"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
