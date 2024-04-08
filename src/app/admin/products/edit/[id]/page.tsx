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

  // const prouct: ProductSchema = {
  //   id: id,
  //   title: "Producto 1",
  //   description: "Descripcion del producto 1",
  //   subCategoryId: 2,
  //   variants: [
  //     {
  //       id: "33",
  //       attribute: "color",
  //       value: "Rojo",
  //       price: 100,
  //       stock: 10,
  //     },
 
  //   ],
  // };

  return <FormCreateProduct product={product} />;
}
