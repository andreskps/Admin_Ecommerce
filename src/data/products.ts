
import { ColumnDef } from "@tanstack/react-table"

export type Products = {
    id: string;
    name: string;
    description: string;
    status: string;
    popular?: boolean;
}

export const products: Products[] = [
    {
        id: "1",
        name: "Producto 1",
        description: "Descripción del producto 1",
        status: "active",
        popular: true
    },
    {
        id: "2",
        name: "Producto 2",
        description: "Descripción del producto 2",
        status: "active",
    
    },
    {
        id: "3",
        name: "Producto 3",
        description: "Descripción del producto 3",
        status: "active"
    },
    {
        id: "4",
        name: "Producto 4",
        description: "Descripción del producto 4",
        status: "active"
    },
    {
        id: "5",
        name: "Producto 5",
        description: "Descripción del producto 5",
        status: "active"
    },
    {
        id: "6",
        name: "Producto 6",
        description: "Descripción del producto 6",
        status: "active"
    },
    {
        id: "7",
        name: "Producto 7",
        description: "Descripción del producto 7",
        status: "active"
    },
    {
        id: "8",
        name: "Producto 8",
        description: "Descripción del producto 8",
        status: "active"
    },
    {
        id: "9",
        name: "Producto 9",
        description: "Descripción del producto 9",
        status: "active"
    },
    {
        id: "10",
        name: "Producto 10",
        description: "Descripción del producto 10",
        status: "active"
    },
    {
        id: "11",
        name: "Producto 11",
        description: "Descripción del producto 11",
        status: "active"
    },
    {
        id: "12",
        name: "Producto 12",
        description: "Descripción del producto 12",
        status: "active"
    },
    {
        id: "13",
        name: "Producto 13",
        description: "Descripción del producto 13",
        status: "active"
    },
    {
        id: "14",
        name: "Producto 14",
        description: "Descripción del producto 14",
        status: "active"
    },
];

