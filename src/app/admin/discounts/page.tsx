import { columsDiscounts } from "@/components/admin/discounts/columnsDiscounts";
import { DataTable } from "@/components/admin/products/data-table";
import { Heading } from "@/components/ui/heading";



export default async function DiscountsPage() {

 const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/discounts`,{
    method: 'GET'
    ,cache: 'no-cache'
    });
    const discounts = await response.json();

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
    <div className="flex items-start justify-between">
      <Heading
        title="Descuentos"
        description="Manage users (Client side table functionalities.)"
        link="/admin/discounts/create"
      />
    </div>

    <DataTable columns={columsDiscounts} searchKey="name"  data={discounts} />
  </div>
  );
}