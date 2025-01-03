import { columsBrands } from "@/components/admin/brands/columnsBrands";
import BreadCrumb from "@/components/admin/breadCru";
import { DataTable } from "@/components/admin/products/data-table";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { SeparatorHorizontal, SeparatorVertical } from "lucide-react";


const breadcrumbItems = [{ title: "Marcas", link: "/admin/brands" }];
export default async function BrandPage() {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brands`,{
    method: 'GET'
    ,cache: 'no-cache'
  });

  const brands = await response.json();
  
  
  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <div className="flex items-start justify-between">
        <Heading
          title="Marcas"
          description="Manage users (Client side table functionalities.)"
          link="/admin/brands/create"
        />
      </div>
  
      <DataTable columns={columsBrands} searchKey="name" data={brands} />
    </div>
  );
}