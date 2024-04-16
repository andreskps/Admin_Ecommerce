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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/validations/categoySchema";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import { createCategory, updateCategory } from "@/lib/api/categories";
import { useRouter } from "next/navigation";
import {
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../../../lib/api/subcategories";

interface Props {
  category?: z.infer<typeof categorySchema>;
}

export const FormCategories = ({ category }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      ...category,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subcategories",
  });

  const addSubcategory = () => {
    append({ name: "" });
  };

  async function handleCreateSubCategory(index: number) {
    const subCategory = form.getValues(`subcategories.${index}`);

    const response = await createSubcategory({
      name: subCategory.name,
      categoryId: category?.id,
    });

    if (!response.ok) {
      toast({
        title: "Error",
        description: "Ocurrió un error al crear la subcategoria",
        className: "bg-red-500 text-white",
      });
      return;
    }

    toast({
      title: "Subcategoria creada",
      description: "La subcategoria se ha creado correctamente",
      className: "bg-green-500 text-white",
    });
  }

  async function handleUpdateSubCategory(index: number) {
    const subCategory = form.getValues(`subcategories.${index}`);

    console.log(subCategory);

    const response = await updateSubcategory({
      id: subCategory.id,
      name: subCategory.name,
    });

    if (!response.ok) {
      toast({
        title: "Error",
        description: "Ocurrió un error al crear la subcategoria",
        className: "bg-red-500 text-white",
      });
      return;
    }

    toast({
      title: "Subcategoria creada",
      description: "La subcategoria se ha creado correctamente",
      className: "bg-green-500 text-white",
    });
  }

  async function handleDeleteSubCategory(index: number) {
    const subCategory = form.getValues(`subcategories.${index}`);

    if (!subCategory.id) {
      remove(index);
      return;
    }

    const response = await deleteSubcategory(subCategory.id);

    if (!response.ok) {
      toast({
        title: "Error",
        description: "Ocurrió un error al eliminar la subcategoria",
        className: "bg-red-500 text-white",
      });
      return;
    }

    remove(index);
  }

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    try {
      const response = category
        ? await updateCategory({
            id: category.id ?? 0,
            name: values.name,
          })
        : await createCategory(values);

      if (!response.ok) {
        toast({
          title: "Error",
          description: "Ocurrió un error al crear la categoria",
          className: "bg-red-500 text-white",
        });
        return;
      }

      toast({
        title: "Categoria creada",
        description: "La categoria se ha creado correctamente",
        className: "bg-green-500 text-white",
      });

      router.refresh();
      router.push("/admin/categories");
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al crear la categoria",
        className: "bg-red-500 text-white",
      });
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle>
          {category ? "Editar categoria" : "Crear categoria"}
        </CardTitle>
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
                    <Input placeholder="Nombre de la categoria" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button type="button" onClick={addSubcategory}>
              Agregar subcategoria
            </Button>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start">
                <FormField
                  control={form.control}
                  name={`subcategories.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormControl>
                        <Input
                          placeholder="Nombre de la subcategoria"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {category ? (
                  category.subcategories[index]?.id ? (
                    <Button
                      type="button"
                      onClick={() => handleUpdateSubCategory(index)}
                    >
                      Editar
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => handleCreateSubCategory(index)}
                    >
                      Añadir
                    </Button>
                  )
                ) : null}

                <Button
                  type="button"
                  onClick={() => handleDeleteSubCategory(index)}
                >
                  Eliminar
                </Button>
              </div>
            ))}

            <Button type="submit" className="w-full">
              {category ? "Editar" : "Crear"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
