import { FormCreateProduct } from "@/components/admin/products/FormCreateProduct";
import { FormProduct } from "@/components/admin/products/FormProduct";

export default async function CreateProductPage() {
  const fetchCategories = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-cache',
  });

  const fetchBrands = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brands`, {
    method: 'GET',
    cache: 'no-cache',
  });

  const fetchPets = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`, {
    method: 'GET',
    cache: 'no-cache',
  });



  const [responseCategories, responseBrands,responsePets] = await Promise.all([fetchCategories, fetchBrands,fetchPets]);

  if (!responseCategories.ok || !responseBrands.ok || !responsePets.ok) {
    throw new Error(`Error: ${responseCategories.status} ${responseCategories.statusText} or ${responseBrands.status} ${responseBrands.statusText}`);
  }

  const categories = await responseCategories.json();
  const brands = await responseBrands.json();
  const pets = await responsePets.json();

  return (
    <FormCreateProduct categories={categories} brands={brands} pets={pets} />
  );
}