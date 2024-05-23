import { useRouter } from "next/navigation";
import { getSession as getSessionClient } from "next-auth/react";
import { useCallback } from "react";

export function useUpdateProduct() {
    const router = useRouter();
  
    return useCallback(
      async (id: string, value: boolean, property: string) => {
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
              [property]: value,
            }),
          }
        );
  
        if (response.ok) {
          router.refresh();
        } else {
          const { error } = await response.json();
          console.error(error);
        }
  
        console.log(`Producto ${id} ${property}: ${value}`);
      },
      [router]
    );
  }