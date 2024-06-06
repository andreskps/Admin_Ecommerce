import { FormCreateProduct } from "@/components/admin/products/FormCreateProduct";
import { FormProduct } from "@/components/admin/products/FormProduct";
import { getDiscounts } from "@/lib/api/discounts";

const fetchData = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export default async function CreateProductPage() {
  const [categories, brands, pets, discounts,providers] = await Promise.all([
    fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`),
    fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/brands`),
    fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`),
    fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/discounts`),
    fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/providers`),
  ]);

  return (
    <FormCreateProduct
      categories={categories}
      brands={brands}
      pets={pets}
      discounts={discounts}
      providers={providers}
    />
  );
}
