import { columnsOrders } from "@/components/admin/orders/columnsOrders";
import { DataTable } from "@/components/admin/products/data-table";
import { Heading } from "@/components/ui/heading";
import { getSession } from "@/lib/api/config";

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    return <div>Unauthorized</div>;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${session.user?.access_token}`,
      },
    }
  );

  const orders = await response.json();

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <div className="flex items-start justify-between">
        <Heading
          title="Mis Ordenes"
          description="Manage users (Client side table functionalities.)"
          link="/admin/orders/create"
        />
      </div>

      <DataTable columns={columnsOrders} searchKey="id" data={orders} />
    </div>
  );
}
