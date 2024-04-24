import { columnsCoupons } from "@/components/admin/coupons/columnsCoupons";
import { DataTable } from "@/components/admin/products/data-table";
import { Heading } from "@/components/ui/heading";

export default async function CouponsPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/coupons`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );
  const coupons = await response.json();

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <div className="flex items-start justify-between">
        <Heading
          title="Cupones"
          description="Manage users (Client side table functionalities.)"
          link="/admin/coupons/create"
        />
      </div>

      <DataTable columns={columnsCoupons} searchKey="code" data={coupons} />
    </div>
  );
}
