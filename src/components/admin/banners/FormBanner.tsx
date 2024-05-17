"use client";

import React from "react";
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
import { bannerSchema } from "@/validations/bannerSchema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilesUpload } from "@/components/ui/files-upload";

interface Props {
  banner?: z.infer<typeof bannerSchema>;
}

export const FormBanner = ({ banner }: Props) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();

  const form = useForm<z.infer<typeof bannerSchema>>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      ...banner,
    },
  });

  async function onSubmit(values: z.infer<typeof bannerSchema>) {
    // Create banner
    console.log(values);
    console.log(files);
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle>{banner ? "Editar banner" : "Crear banner"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FilesUpload onUpload={setFiles} initialFiles={files} />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="name"
                  className="text-sm"
                  >Nombre</FormLabel>
        
                  <FormControl>
                    <Input placeholder="Nombre del banner" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-3" disabled={loading}>
              {banner ? "Editar banner" : "Crear banner"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
