import { z } from "zod";

export const categorySchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  subcategories: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string(),
    })
  ),
});


export type Category = z.infer<typeof categorySchema>