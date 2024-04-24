import { z } from "zod";

export const discountSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  percentage: z.number().min(1, "El descuento no puede ser menor a 1"),
  startsAt: z.string().optional(),
  expiresAt: z.string().optional()
});


export type Discount = z.infer<typeof discountSchema>;