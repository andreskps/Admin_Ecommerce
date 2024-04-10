import { Brand } from "@/validations/brandSchema";

import  {getSession as getSessionClient} from "next-auth/react";

export const createBrand = async (brand: Brand) => {

    const session = await getSessionClient();

    if (!session || !session.user?.access_token) {
        throw new Error("No se pudo obtener la sesión o el token de acceso.");
    }



    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brands`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${session.user.access_token}`,
        },
        body: JSON.stringify(brand)
    });

    return response

}

export const updateBrand = async (brand: Brand) => {

    const {id,...res} = brand

    const session = await getSessionClient();

    if (!session || !session.user?.access_token) {
        throw new Error("No se pudo obtener la sesión o el token de acceso.");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brands/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${session.user.access_token}`,
        },
        body: JSON.stringify(res)
    });

    return response

}