import { ProductSchema } from "@/validations/productSchema";
import { getSession } from "./config";
import { getServerSession } from "next-auth";
import { getSession as getSessionClient } from "next-auth/react";
import { productSchema } from "../../validations/productSchema";

export const getProductsAdmin = async () => {
  const session = await getSession();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/admin`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data;
};

export const createProduct = async (productData: ProductSchema) => {
  const { categoryId, ...res } = productData;
  try {
    const session = await getSessionClient();

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
        body: JSON.stringify(res),
      }
    );

    
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-cache",
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

export const updateVariant = async (variant: {
  id: number;
  attribute: string;
  value: string;
  price: number;
  stock: number;
}) => {
  try {
    const session = await getSessionClient();

    const { id, ...res } = variant;

    if (!session || !session.user?.access_token) {
      throw new Error("No se pudo obtener la sesión o el token de acceso.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/variants/${variant.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${session.user.access_token}`,
        },
        body: JSON.stringify(res),
      }
    );

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProduct = async (productData: ProductSchema) => {
  const { id, categoryId, variants, ...rest } = productData;





  try {
    const session = await getSessionClient();

    if (!session || !session.user?.access_token) {
      throw new Error("No se pudo obtener la sesión o el token de acceso.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${session.user.access_token}`,
        },
        body: JSON.stringify({
          ...rest,
          discountId: rest.discountId === 0 ? null : rest.discountId,
        }),
      }
    );

    return response;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createVariant = async (variant: {
  attribute: string;
  value: string;
  price: number;
  stock: number;
  productId: string;
}) => {
  try {
    const session = await getSessionClient();

    if (!session || !session.user?.access_token) {
      throw new Error("No se pudo obtener la sesión o el token de acceso.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/variants`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${session.user.access_token}`,
        },
        body: JSON.stringify(variant),
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const session = await getSessionClient();

    if (!session || !session.user?.access_token) {
      throw new Error("No se pudo obtener la sesión o el token de acceso.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${session.user.access_token}`,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};


export const deleteVariant = async (id: string) => {
  try {
    const session = await getSessionClient();

    if (!session || !session.user?.access_token) {
      throw new Error("No se pudo obtener la sesión o el token de acceso.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/variants/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${session.user.access_token}`,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
}


export const uploadImages = async (files: File[]) => {
  try {
    const session = await getSessionClient();

    if (!session || !session.user?.access_token) {
      throw new Error("No se pudo obtener la sesión o el token de acceso.");
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
        body: formData,
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
}

export const deleteImage = async (id: number) => {
  try {
    const session = await getSessionClient();

    if (!session || !session.user?.access_token) {
      throw new Error("No se pudo obtener la sesión o el token de acceso.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/delete-image/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      }
    );
 

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}