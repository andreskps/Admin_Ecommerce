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
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { ProductSchema, productSchema } from "@/validations/productSchema";
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
import {
  createProduct,
  createVariant,
  updateProduct,
  updateVariant,
} from "@/lib/api/products";
import { useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type Category = {
  id: number;
  name: string;
  subcategories: SubCategory[];
};

type SubCategory = {
  id: number;
  name: string;
};

interface Props {
  product?: ProductSchema;
  categories: Category[];
}

export const FormCreateProduct = ({ product, categories }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    product?.categoryId ?? null
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    product?.subCategoryId ?? null
  );

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...product,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  // form.watch("variants");
  const añadirVariante = () => {
    append({
      attribute: "",
      price: 0,
      stock: 0,
      value: "",
    });
  };

  async function handleUpdateVariant(index: number) {
    const variant = form.getValues(`variants.${index}`);

    const response = await updateVariant(
      variant as {
        id: number;
        attribute: string;
        value: string;
        price: number;
        stock: number;
      }
    );

    if (!response.ok) {
      toast({
        title: "Error al actualizar variante",
        description: "Hubo un error al actualizar la variante",
        className: "bg-red-500 text-white",
      });
      return;
    }

    toast({
      title: "Variante actualizada",
      description: "La variante se ha actualizado correctamente",
      className: "bg-green-500 text-white",
    });
  }

  async function handleCreateVariant(index: number) {
    const variant = form.getValues(`variants.${index}`);

    // if (!product) return;
    // const response = await createVariant({
    //   ...variant,
    //   product_id: product?.id ?? ""
    // });

    // if (!response.ok) {
    //   toast({
    //     title: "Error al crear variante",
    //     description: "Hubo un error al crear la variante",
    //     className: "bg-red-500 text-white",
    //   });
    //   return;
    // }

    // toast({
    //   title: "Variante creada",
    //   description: "La variante se ha creado correctamente",
    //   className: "bg-green-500 text-white",
    // });
  }

  async function onSubmit(values: z.infer<typeof productSchema>) {
    try {
      values.id ? await updateProduct(values) : await createProduct(values);

      form.reset();

      toast({
        title: "Producto creado",
        description: "El producto se ha creado correctamente",

        className: "bg-green-500 text-white",
      });

      router.push("/admin/products");
    } catch (error) {
      toast({
        title: "Error al crear producto",
        description: "Hubo un error al crear el producto",
        className: "bg-red-500 text-white",
      });
      return;
    }
  }
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle>{product ? "Editar Producto" : "Crear Producto"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <div>{JSON.stringify(form.formState.errors)}</div>

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
              name="categoryId"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="text-sm" htmlFor="categoryId">
                    Categoria
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        const selectedValue = parseInt(value);
                        setSelectedCategory(selectedValue);
                        form.setValue("categoryId", selectedValue);
                      }}
                      defaultValue={selectedCategory?.toString()}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Seleccione categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                    Subcategoria
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        const selectedValue = parseInt(value);
                        setSelectedSubCategory(selectedValue);
                        form.setValue("subCategoryId", selectedValue);
                      }}
                      defaultValue={selectedSubCategory?.toString()}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Seleccione subcategoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {selectedCategory
                            ? categories
                                .find(
                                  (category) => category.id === selectedCategory
                                )
                                ?.subcategories?.map((subCategory) => (
                                  <SelectItem
                                    key={subCategory.id}
                                    value={subCategory.id.toString()}
                                  >
                                    {subCategory.name}
                                  </SelectItem>
                                ))
                            : null}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button type="button" onClick={añadirVariante}>
              Agregar Variante
            </Button>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start">
                {/* <div className="flex flex-col">
                  <Label className="text-gray-700">Atributo</Label>
                  <Select
                    onValueChange={(value) => {
                      form.setValue(`variants.${index}.attribute`, value);
                    }}
                    defaultValue={field.attribute}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Atributo" />
                    </SelectTrigger>
                    <SelectContent className="w-[180px]">
                      <SelectGroup>
                        <SelectItem value="color">Color</SelectItem>
                        <SelectItem value="size">Tamaño</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div> */}
                <FormField
                  control={form.control}
                  name={`variants.${index}.attribute`}
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel className="text-sm" htmlFor="attribute">
                        Atributo
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Atributo" />
                          </SelectTrigger>
                          <SelectContent className="w-[180px]">
                            <SelectGroup>
                              <SelectItem value="color">Color</SelectItem>
                              <SelectItem value="size">Tamaño</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variants.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel className="text-sm" htmlFor="value">
                        Valor
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Valor" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variants.${index}.price`}
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel className="text-sm" htmlFor="price">
                        Precio
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Precio"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          } // Convierte el valor a un número
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variants.${index}.stock`}
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel className="text-sm" htmlFor="stock ">
                        Stock
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Stock"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          } // Convierte el valor a un número
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {product ? (
                  product.variants[index]?.id ? (
                    <Button
                      type="button"
                      onClick={() => handleUpdateVariant(index)}
                    >
                      Editar
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => handleCreateVariant(index)}
                    >
                      Añadir
                    </Button>
                  )
                ) : null}

                <Button
                  className="bg-red-500 text-white hover:bg-red-600 self-end"
                  onClick={() => remove(index)}
                >
                  Eliminar
                </Button>
              </div>
            ))}

            <Button className="w-full" type="submit">
              {product ? "Editar Producto" : "Crear Producto"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
