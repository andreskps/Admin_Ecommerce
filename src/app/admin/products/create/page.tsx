import { FormCreateProduct } from "@/components/admin/products/FormCreateProduct";
import { FormProduct } from "@/components/admin/products/FormProduct";

export default async function CreateProductPage() {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  
    cache: 'no-cache',
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const categories = await response.json();

  return (

    <FormCreateProduct  categories={categories} />
  );
}
