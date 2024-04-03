"use client"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { productSchema } from "@/validations/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

export const FormCreateProduct = () => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    // defaultValues: {
    //     title: "",
    //     description: "",
    //     subCategoryId: 0,
    //     variants: [],
    // },
  });
  function onSubmit(values: z.infer<typeof productSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle>Crear Producto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem
                className="space-y-2"
                >
                  <FormLabel
                    className="text-sm mx-2"
                    htmlFor="name"

                  >Nombre</FormLabel>
                  <FormControl>
                    <input placeholder="Nombre del producto" {...field} />
                  </FormControl>
                  <FormMessage 
                    className="text-blue-500"
                  />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Crear Producto
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
