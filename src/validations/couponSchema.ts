import { z } from "zod";

export const couponSchema = z.object({
  id: z.number().optional(),
  code: z.string(),
  percentage: z.number().min(1, "El descuento no puede ser menor a 1"),
  minimumAmount: z.number().min(1, "El monto mínimo no puede ser menor a 1").optional(),
  startsAt: z.string().optional().nullable(),
  expiresAt: z.string().optional().nullable(),
});

export type Coupon = z.infer<typeof couponSchema>;