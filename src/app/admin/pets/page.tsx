import { columsPets } from "@/components/admin/pets/columnsPets";
import { DataTable } from "@/components/admin/products/data-table";
import { Heading } from "@/components/ui/heading";

export default async  function PetsPage() {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`,{
    method: 'GET'
    ,cache: 'no-cache'
  });

  const pets = await response.json();




  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
    <div className="flex items-start justify-between">
      <Heading
        title="Mascotas"
        description="Manage users (Client side table functionalities.)"
        link="/admin/pets/create"
      />
    </div>

    <DataTable columns={columsPets} searchKey="name" data={pets} />
  </div>
  );
}