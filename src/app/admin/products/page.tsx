import { columsProducts } from "@/components/admin/products/columns";
import { DataTable } from "@/components/admin/products/data-table";
import { TableProducts } from "@/components/component/table";
import Link from "next/link";
import React from "react";
import { getProductsAdmin } from "@/lib/api/products";
import { products } from "@/data/products";
import { Heading } from "@/components/ui/heading";

export default async function ProducsPage() {
  const products = await getProductsAdmin();

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <div className="flex items-start justify-between scroll-m-2">
        <Heading
          title="Productos"
          description="Manage users (Client side table functionalities.)"
          link="/admin/products/create"
        />
      </div>

      <DataTable columns={columsProducts} data={products} searchKey="title" />
    </div>
  );
}
