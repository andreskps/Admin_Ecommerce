import { FormCreateProduct } from "@/components/admin/products/FormCreateProduct";
import { ProductSchema } from "@/validations/productSchema";

interface Props {
  params: {
    id: string;
  };
}

const fetchData = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-cache',
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export default async function EditProductPage({ params }: Props) {
  const { id } = params;


  const [categories, brands, pets, product, discounts] = await Promise.all([
    fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`),
    fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/brands`),
    fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`),
    fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`),
    fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/discounts`),
  ]);

  return <FormCreateProduct product={product} categories={categories} brands={brands} pets={pets} discounts={discounts} />;
}