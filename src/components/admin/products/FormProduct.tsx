"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "../../ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
// import { ModalVariant } from "./ModalVariant";
import { useState } from "react";
import { createProduct } from "@/lib/api/products";
import { productSchema } from "@/validations/productSchema";
import { z } from "zod";

type FormValues = z.infer<typeof productSchema>;
export function FormProduct() {
  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(productSchema),
  });



  const onSubmit = (data: FormValues) => {
    console.log("hola")
    console.log(data);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle>Crear Producto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label className="text-sm" htmlFor="name">
              Nombre
            </Label>
            <Input
              {...register("title", { required: true })}
              placeholder="Enter product name"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-sm" htmlFor="description">
              Descripción
            </Label>
            <Textarea
              {...register("description", { required: true })}
              placeholder="Enter product description"
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-sm" htmlFor="category">
              Categoria
            </Label>
            <Select
            // {...register("category", { required: true })}
            // onValueChange={(value) =>
            //   setValues({ ...values, category: value })
            // }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="books">Books</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm" htmlFor="images">
              Images
            </Label>
            <Input accept="image/*" id="images" multiple type="file" />
          </div>

          {/* <div className="flex items-center gap-2">
            <ModalVariant setValues={setValues} values={values} />
          </div> */}

          {/* <div className="grid gap-2">
            <Label className="text-sm" htmlFor="variants">
              Variantes
            </Label>
            <div className="flex space-x-4">
              {values.variants.map((variant, index) => (
                <div
                  key={index}
                  className="flex-none p-4 rounded-lg shadow-md"
                >
                  <h3 className="font-bold text-lg mb-2">
                    Variante {index + 1}
                  </h3>
                  <p>Atributo: {variant.attribute}</p>
                  <p>Valor: {variant.value}</p>
                  <p>Stock: {variant.stock}</p>
                  <p>Precio: {variant.price}</p>
                  <Button
                    type="button"
                    className="mt-4 bg-red-500 text-white rounded"
                    onClick={() => handleRemoveVariant(index)}
                  >
                    Eliminar Variante
                  </Button>
                </div>
              ))}
            </div>
          </div> */}

          <button className="w-full" type="submit">
            Crear Producto
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
