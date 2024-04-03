"use client";
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
import { ModalVariant } from "../modal/ModalVariant";
import { useState } from "react";
import { createProduct } from "@/lib/api/products";

export interface FormValues {
  name: string;
  description: string;
  category: string;
  images: File[];
  variants: {
    attribute: string;
    value: string;
    stock: number;
    price: number;
  }[];
}

export function FormProduct() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    description: "",
    category: "",
    images: [],
    variants: [],
  });

  const handleSubmit = async () => {

    const productData = {
      "title": "Piscina pato",
      "description": "picina de buena calidad",
      "subCategoryId":3,
      "variants": [
        {
          "attribute": "Tamaño",
          "value": "XS",
          "price": 5,
          "stock": 50
        },
        {
          "attribute": "Tamaño",
          "value": "S",
          "price": 10,
          "stock": 50
        },
        {
          "attribute": "Tamaño",
          "value": "L",
          "price": 15,
          "stock": 50
        }
      ]
    };
    try {
      await createProduct(productData);
    } catch (error) {
      console.error(error);
    }
   


  };

  const handleRemoveVariant = (index: number) => {
    setValues({
      ...values,
      variants: values.variants.filter((_, i) => i !== index),
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle>Crear Producto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="text-sm" htmlFor="name">
              Nombre
            </Label>
            <Input
              id="name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-sm" htmlFor="description">
              Descripción
            </Label>
            <Textarea
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
              id="description"
              placeholder="Enter product description"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-sm" htmlFor="category">
              Categoria
            </Label>
            <Select
              onValueChange={(value) =>
                setValues({ ...values, category: value })
              }
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

          <div className="flex items-center gap-2">
            <ModalVariant setValues={setValues} values={values} />
          </div>

          <div className="grid gap-2">
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
          </div>
        </div>
        <Button onClick={handleSubmit} className="w-full" type="button">
          Crear Producto
        </Button>
      </CardContent>
    </Card>
  );
}
