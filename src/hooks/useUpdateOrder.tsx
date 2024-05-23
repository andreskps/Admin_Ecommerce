import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { getSession as getSessionClient } from 'next-auth/react';
import { useCallback } from "react";

export function useUpdateOrder() {
    const router = useRouter();
    const { toast } = useToast();
  
    return useCallback(
      async (id: string, value: string, field: string) => {
        const session = await getSessionClient();
  
        if (!session || !session.user?.access_token) {
          throw new Error("No se pudo obtener la sesión o el token de acceso.");
        }
  
        const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.access_token}`,
          },
          body: JSON.stringify({
            [field]: value,
          }),
        });
  
        
        if (response.ok) {
          toast({
            title: "Success",
            description: "Orden actualizada correctamente",
            className: "bg-green-500 text-white",
          });
          router.push("/admin/orders");
          return;
        }
  
        toast({
          title: "Error",
          description: "No se pudo actualizar la orden",
          className: "bg-red-500 text-white",
        });
      },
      [router]
    );
  }