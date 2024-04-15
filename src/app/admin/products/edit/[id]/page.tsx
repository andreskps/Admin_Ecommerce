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

  const fetchProduct = await  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-cache",
  })



  const [responseCategories, responseBrands,responsePets,responseProduct] = await Promise.all([fetchCategories, fetchBrands,fetchPets,fetchProduct]);

  if (!responseCategories.ok || !responseBrands.ok || !responsePets.ok) {
    throw new Error(`Error: ${responseCategories.status} ${responseCategories.statusText} or ${responseBrands.status} ${responseBrands.statusText}`);
  }

  const categories = await responseCategories.json();
  const brands = await responseBrands.json();
  const pets = await responsePets.json();
  const product = await responseProduct.json();



  return <FormCreateProduct product={product}  categories={categories} brands={brands} pets={pets}/>;
}
