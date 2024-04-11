import  {getSession as getSessionClient} from "next-auth/react";

import {Pet} from "@/validations/petSchema";

export const createPet = async (pet: Pet) => {

    const session = await getSessionClient();

    if (!session || !session.user?.access_token) {
        throw new Error("No se pudo obtener la sesión o el token de acceso.");
    }



    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${session.user.access_token}`,
        },
        body: JSON.stringify(pet)
    });

    return response
}

export const updatePet = async (id:number,pet:Pet) => {
    
    const session = await getSessionClient();

    if (!session || !session.user?.access_token) {
        throw new Error("No se pudo obtener la sesión o el token de acceso.");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${session.user.access_token}`,
        },
        body: JSON.stringify(pet)
    });

    return response
}