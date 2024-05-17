import { columsCategories } from "@/components/admin/categories/columsCategories";
import { DataTable } from "@/components/admin/products/data-table";
import { Heading } from "@/components/ui/heading";

export default async function CategoryPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  const categories = await response.json();

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <div className="flex items-start justify-between">
        <Heading
          title="Categorias"
          description="Manage users (Client side table functionalities.)"
          link="/admin/categories/create"
        />
      </div>

      <DataTable
        columns={columsCategories}
        searchKey="name"
        data={categories}
      />
    </div>
  );
}
