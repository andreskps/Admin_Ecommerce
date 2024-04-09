import { FormCreateProduct } from "@/components/admin/products/FormCreateProduct";
import { getProduct } from "@/lib/api/products";
import { ProductSchema } from "@/validations/productSchema";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: Props) {
  const { id } = params;

  
  const res = await  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-cache",
  })

  const product = await res.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const categories = await response.json();

  console.log(product)

  return <FormCreateProduct product={product}  categories={categories}/>;
}
