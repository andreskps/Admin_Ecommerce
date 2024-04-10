import { FormBrand } from "@/components/admin/brands/FormBrand";

export default function EditBrandPage() {

    const brand = {
        id: 1,
        name: "Brand 1",
        description: "Description 1"
    }
  return (
      
    <FormBrand brand={brand} />
  );
}