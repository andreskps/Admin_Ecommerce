import { z } from "zod";


export const brandSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(2, "El nombre no puede tener menos de 2 caracteres"),
    description: z.string(),
    logo: z.string().url().optional(),
});

export type Brand = z.infer<typeof brandSchema>;