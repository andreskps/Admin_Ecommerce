import { Heading } from "@/components/ui/heading";

export default function CategoryPage() {
  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
    <div className="flex items-start justify-between">
      <Heading
        title="Categorias"
        description="Manage users (Client side table functionalities.)"
        link="/admin/categories/create"
      />
    </div>

    {/* <DataTable columns={columsBrands} searchKey="name" data={brands} /> */}
  </div>
  );
}