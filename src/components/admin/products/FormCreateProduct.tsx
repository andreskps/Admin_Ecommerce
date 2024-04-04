"use client";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export const FormCreateProduct = () => {
  const [variants, setVariants] = useState([
    { attribute: "", price: "", stock: "" ,value:""},
  ]);
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
        title: "",
        description: "",
        subCategoryId: 1,
        // variants: [],
    },
  });

  const addVariant = () => {
    setVariants([...variants, { attribute: "", price: "", stock: "",value:"" }]);
  };

  


  function onSubmit(values: z.infer<typeof productSchema>) {
      const newValues = {...values, variants: variants}
    
      console.log(variants);
    // ✅ This will be type-safe and validated.
    console.log(newValues);
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
                <FormItem className="grid gap-2">
                  <FormLabel className="text-sm" htmlFor="title">
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
                      placeholder="Descripción del producto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subCategoryId"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="text-sm" htmlFor="subCategoryId">
                    Categoria
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        form.setValue("subCategoryId", parseInt(value));
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Seleccione categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                          <SelectItem value="1">Apple</SelectItem>
                          <SelectItem value="2">Banana</SelectItem>
                          <SelectItem value="3">Blueberry</SelectItem>
                          <SelectItem value="4">Grapes</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button type="button" onClick={addVariant}>
              Agregar Variante
            </Button>
            {variants.map((variant, index) => (
              <div key={index} className="flex gap-2">
                {/* <Input
                  type="text"
                  placeholder="Atributo"
                  value={variant.attribute}
                  onChange={(e) =>
                    setVariants((prev) => {
                      console.log(prev);
                      const copy = [...prev];
                      copy[index].attribute = e.target.value;
                      return copy;
                    })
                  }
                /> */}
                <Select
                  onValueChange={(value) => {
                    setVariants((prev) => {
                      const copy = [...prev];
                      copy[index].attribute = value;
                      return copy;
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Atributo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="color">Color</SelectItem>
                      <SelectItem value="size">Tamaño</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  placeholder="Valor"
                  value={variant.value}
                  onChange={(e) =>
                    setVariants((prev) => {
                      const copy = [...prev];
                      copy[index].value = e.target.value;
                      return copy;
                    })
                  }
                />

                
                <Input
                  type="number"
                  placeholder="Precio"
                  value={variant.price}
                  onChange={(e) =>{
                    setVariants((prev) => {
                      const copy = [...prev];
                      copy[index].price = e.target.value;
                      return copy;
                    })
                  
                  }}
                />
                <Input
            
                  type="number"
                  placeholder="Stock"
                  value={variant.stock}
                  onChange={(e) =>
                    setVariants((prev) => {
                      const copy = [...prev];
                      copy[index].stock = e.target.value;
                      return copy;
                    })
                  }
                />
                <Button
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={() => {
                    setVariants((prev) => {
                      const copy = [...prev];
                      copy.splice(index, 1);
                      return copy;
                    });
                  }}
                >
                  Eliminar
                </Button>
              </div>
            ))}

            <Button className="w-full" type="submit">
              Crear Producto
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
