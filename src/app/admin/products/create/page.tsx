import { FormCreateProduct } from "@/components/admin/products/FormCreateProduct";
import { FormProduct } from "@/components/admin/products/FormProduct";

export default async function CreateProductPage() {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const categories = await response.json();

  console.log(categories)






  return (

    <FormCreateProduct  categories={categories} />
  );
}
