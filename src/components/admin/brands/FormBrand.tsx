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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createBrand, updateBrand } from "@/lib/api/brands";
import { revalidateTag } from "next/cache";

interface Props {
  brand?: z.infer<typeof brandSchema>;
}

export const FormBrand = ({ brand }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      ...brand,
    },
  });

  async function onSubmit(values: z.infer<typeof brandSchema>) {
    // Create brand
    try {
      const res = brand ? await updateBrand(values) : await createBrand(values);

      console.log(await res.json());

      if (!res.ok) {
        alert("Ocurrió un error al crear la marca");
        return;
      }

      alert("Marca creada con éxito");

      router.push("/admin/brands");

    } catch (error) {
      console.log(error)
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
