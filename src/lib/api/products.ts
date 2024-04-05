import { ProductSchema } from "@/validations/productSchema";
import { getSession } from "./config";
import { getServerSession } from "next-auth";

export const getProductsAdmin = async () => {
  const session = await getSession();

  console.log(session);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/admin`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${session?.user?.access_token}`,
      },
    }
  );

  console.log(res);

  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data;
};

export const createProduct = async (productData: ProductSchema) => {
  try {
    const session = await getSession();

    if (!session || !session.user?.access_token) {
      throw new Error("No se pudo obtener la sesión o el token de acceso.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${session.user.access_token}`,
        },
        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
