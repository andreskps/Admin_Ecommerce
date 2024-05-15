import { z } from "zod";


export const productSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(2, "El titulo no puede tener mas de 255 caracteres"),
    description: z.string().min(10, "La descripcion no puede tener menos de 10 caracteres"),
    subCategoryId: z.number(),
    categoryId: z.number(),
    discountId: z.number().optional(),
    brandId: z.number().optional(),
    petId: z.number(),
    images: z.array(z.string()).optional(),
    variants: z.array(
        z.object({
            id: z.number().optional(),
            attribute: z.string(),
            value: z.string(),
            price: z.number().min(0, "El precio no puede ser menor a 0"),
            stock: z.number().min(0, "El stock no puede ser menor a 0"),
            // priceDiscount: z.number().optional(),
        }).optional()
    ),
});







export type ProductSchema = z.infer<typeof productSchema>;
