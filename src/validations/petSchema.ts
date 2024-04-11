import { z } from "zod";

export const petSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(2, "El nombre no puede tener menos de 2 caracteres"),
});

export type Pet = z.infer<typeof petSchema>;