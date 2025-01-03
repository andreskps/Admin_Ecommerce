import { z } from "zod";

export const discountSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  percentage: z.number().min(1, "El descuento no puede ser menor a 1"),
  startsAt: z.string().optional().nullable(),
  expiresAt: z.string().optional().nullable(),
});


export type Discount = z.infer<typeof discountSchema>;