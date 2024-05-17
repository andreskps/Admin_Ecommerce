
import { z } from "zod";

export const bannerSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(2, "El título no puede tener menos de 2 caracteres"),
    urlImg: z.string().url().optional()
});

export type Banner = z.infer<typeof bannerSchema>;