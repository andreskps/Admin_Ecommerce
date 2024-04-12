import  {getSession as getSessionClient} from "next-auth/react";

type SubcategorySchema = {
    id?: number;
    name: string;
    categoryId?: number;
};


export const  createSubcategory = async (subcategory: SubcategorySchema) => {
    
        const session = await getSessionClient();
    
        if (!session || !session.user?.access_token) {
            throw new Error("No se pudo obtener la sesión o el token de acceso.");
        }
    
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${session.user.access_token}`,
            },
            body: JSON.stringify(subcategory)
        });
    
        return response
}

export const updateSubcategory = async (subcategory:SubcategorySchema) => {
    
        const {id,...res} = subcategory
        
        const session = await getSessionClient();
    
        if (!session || !session.user?.access_token) {
            throw new Error("No se pudo obtener la sesión o el token de acceso.");
        }
    
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${session.user.access_token}`,
            },
            body: JSON.stringify(res)
        });
    
        return response;
}
