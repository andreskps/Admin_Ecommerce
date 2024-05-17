import { columnsBanners } from "@/components/admin/banners/ColumnsBrands";
import { DataTable } from "@/components/admin/products/data-table";
import { Heading } from "@/components/ui/heading";

export default async function BannersPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/banners`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  const banners = await response.json();

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <div className="flex items-start justify-between">
        <Heading
          title="Banners"
          description="Manage users (Client side table functionalities.)"
          link="/admin/banners/create"
        />
      </div>

      <DataTable columns={columnsBanners} searchKey="name" data={banners} />
    </div>
  );
}
