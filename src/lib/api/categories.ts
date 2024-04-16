import  {getSession as getSessionClient} from "next-auth/react";

import { Category } from "@/validations/categoySchema";

export const createCategory = async (category: Category) => {

    const session = await getSessionClient();

    if (!session || !session.user?.access_token) {
        throw new Error("No se pudo obtener la sesión o el token de acceso.");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${session.user.access_token}`,
        },
        body: JSON.stringify(category)
    });

    return response
}

export const updateCategory = async (category:{
    id: number;
    name: string;

}) => {

    const {id,...res} = category
    
    const session = await getSessionClient();

    if (!session || !session.user?.access_token) {
        throw new Error("No se pudo obtener la sesión o el token de acceso.");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`, {
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

export const deleteCategory = async (id: string) => {

    const session = await getSessionClient();

    if (!session || !session.user?.access_token) {
        throw new Error("No se pudo obtener la sesión o el token de acceso.");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${session.user.access_token}`,
        }
    });

    return response
}