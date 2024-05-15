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
  deleteVariant,
  updateProduct,
  updateVariant,
  uploadImages,
} from "@/lib/api/products";
import { useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { FilesUpload } from "@/components/ui/files-upload";
import CardImages from "./CardImages";
import { getDiscounts } from "@/lib/api/discounts";
import { Discount } from "@/validations/discountSchema";

type Category = {
  id: number;
  name: string;
  subcategories: SubCategory[];
};

type SubCategory = {
  id: number;
  name: string;
};

type Brands = {
  id: number;
  name: string;
};

type Pets = {
  id: number;
  name: string;
};

interface Props {
  product?: {
    id: string;
    title: string;
    description: string;
    categoryId: number;
    subCategoryId: number;
    brandId: number;
    petId: number;
    images: { id: number; url: string }[];
    variants: {
      id: number;
      attribute: string;
      value: string;
      price: number;
      stock: number;
    }[];
  };
  categories: Category[];
  brands?: Brands[];
  pets?: Pets[];
  discounts?: Discount[];
}

export const FormCreateProduct = ({
  product,
  categories,
  brands,
  pets,
  discounts,
}: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    product?.categoryId ?? null
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    product?.subCategoryId ?? null
  );

  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...product,
      images: [],
    },
  });

  const onUpload = (files: File[]) => {
    setFiles(files);
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

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

    if (
      !product ||
      !variant?.attribute ||
      !variant?.value ||
      !variant?.price ||
      !variant?.stock
    )
      return;

    const response = await createVariant({
      ...variant,
      productId: product?.id ?? "",
    });

    if (!response.ok) {
      toast({
        title: "Error al crear variante",
        description: "Hubo un error al crear la variante",
        className: "bg-red-500 text-white",
      });
      return;
    }

    router.refresh();
    toast({
      title: "Variante creada",
      description: "La variante se ha creado correctamente",
      className: "bg-green-500 text-white",
    });
  }

  async function handleDeleteVariant(index: number) {
    if (!product) {
      return remove(index);
    }

    const variant = form.getValues(`variants.${index}`);

    if (!variant) return;

    if (!variant.id) {
      return remove(index);
    }

    const response = await deleteVariant(variant.id.toString());

    if (!response.ok) {
      toast({
        title: "Error al eliminar variante",
        description: "Hubo un error al eliminar la variante",
        className: "bg-red-500 text-white",
      });
      return;
    }

    remove(index);

    toast({
      title: "Variante eliminada",
      description: "La variante se ha eliminado correctamente",
      className: "bg-green-500 text-white",
    });
  }

  async function onSubmit(values: z.infer<typeof productSchema>) {
    try {

       if (!values.variants || values.variants.length === 0) {
      return showErrorToast(
        "Error al crear producto",
        "El producto debe tener al menos una variante"
      );
    }
     

      if (files.length > 0) {
        const urls: string[] = await uploadImages(files);
        values.images = urls;
      }

      const response = product
        ? await updateProduct({ ...values })
        : await createProduct({ ...values });

      if (!response.ok) {
        return showErrorToast(
          "Error al crear producto",
          "Hubo un error al crear el producto"
        );
      }

      showSuccessToast(
        `Producto ${product ? "actualizado" : "creado"}`,
        `El producto se ha ${product ? "actualizado" : "creado"} correctamente`
      );

      router.refresh();
      router.push("/admin/products");
    } catch (error) {
      showErrorToast(
        "Error al crear producto",
        "Hubo un error al crear el producto"
      );
    }
  }

  function showErrorToast(title: string, description: string) {
    toast({
      title,
      description,
      className: "bg-red-500 text-white",
    });
  }

  function showSuccessToast(title: string, description: string) {
    toast({
      title,
      description,
      className: "bg-green-500 text-white",
    });
  }
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle>{product ? "Editar Producto" : "Crear Producto"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* {JSON.stringify(form.formState.errors)} */}
            <FilesUpload onUpload={onUpload} initialFiles={files} />

            {product ? <CardImages images={product.images} /> : null}

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
              name="slug"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="text-sm" htmlFor="slug">
                    Slug
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Slug" {...field} />
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

            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="text-sm" htmlFor="brandId">
                    Marca
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        form.setValue("brandId", parseInt(value));
                      }}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Seleccione marca" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {brands?.map((brand) => (
                            <SelectItem
                              key={brand.id}
                              value={brand.id.toString()}
                            >
                              {brand.name}
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
              name="petId"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="text-sm" htmlFor="petId">
                    Tipo Mascota
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        form.setValue("petId", parseInt(value));
                      }}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Seleccione mascota" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {pets?.map((pet) => (
                            <SelectItem key={pet.id} value={pet.id.toString()}>
                              {pet.name}
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
              name="discountId"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="text-sm" htmlFor="discountId">
                    Descuento
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        form.setValue("discountId", parseInt(value));
                      }}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Seleccione descuento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
              
                        <SelectItem value="0">Sin descuento</SelectItem>
                          {discounts?.map((discount) => (
                            <SelectItem
                              key={discount.id}
                              value={discount.id?.toString() ?? ""}
                            >
                              {discount.name}
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

            <Button type="button" onClick={añadirVariante}>
              Agregar Variante
            </Button>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start">
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
                              <SelectItem value="peso">Peso</SelectItem>
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

                <div className="flex self-end gap-2">
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
                    type="button"
                    className="bg-red-500 text-white hover:bg-red-600  "
                    onClick={() => handleDeleteVariant(index)}
                  >
                    Eliminar
                  </Button>
                </div>
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
