import { getSession } from "next-auth/react";



export const getProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products',{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'

        }
    });


};

export const createProduct = async (productData:any) => {
    // console.log(productData)
    const session = await getSession();
    
    const token = session!.user?.access_token;

    
 

    console.log(token)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify(productData)
    });



    if (!res.ok) {
        console.log(`Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
}