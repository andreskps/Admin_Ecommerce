import { z } from "zod";

export const productSchema = z.object({
    title: z.string().min(2, "El titulo no puede tener mas de 255 caracteres"),
    description: z.string().min(10, "La descripcion no puede tener menos de 10 caracteres"),
    subCategoryId: z.number(),
    // variants: z.array(
    //     z.object({
    //         attribute: z.string(),
    //         value: z.string(),
    //         price: z.number(),
    //         stock: z.number(),
    //         priceDiscount: z.number().optional(),
    //     })
    // ),
});

export type ProductSchema = z.infer<typeof productSchema>;
