
import { ColumnDef } from "@tanstack/react-table"

export type Products = {
    id: string;
    title: string;
    description: string;
    isPopular?: boolean;
    isNew?: boolean;
    isLowStock?: boolean;
    isActive?: boolean;
}

export const products: Products[] = [];

for (let i = 0; i < 10; i++) {
  products.push({
    id: `product${i}`,
    title: `Producto ${i}`,
    description: `Descripción del producto ${i}`,
    isPopular: i % 2 === 0, // Los productos pares serán populares
    isActive: true,
  });
}




