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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema } from "@/validations/petSchema";
import { z } from "zod";
import { createPet, updatePet } from "@/lib/api/pets";

interface Props {
  pet?: z.infer<typeof petSchema>;
}

export const FormPet = ({ pet }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof petSchema>>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      ...pet,
    },
  });

  async function onSubmit(values: z.infer<typeof petSchema>) {
    try {
      const res = pet ? await updatePet(values) : await createPet(values);

      console.log(await res.json());

      if (!res.ok) {
        alert("Ocurrió un error al crear la mascota");
        return;
      }

      alert("Mascota creada con éxito");

      router.push("/admin/pets");
    } catch (error) {
      console.log(error);
      alert("Ocurrió un error al crear la mascota");
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle>{pet ? "Editar mascota" : "Crear mascota"}</CardTitle>
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
                    <Input placeholder="Tipo mascota" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {pet ? "Editar mascota" : "Crear mascota"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
