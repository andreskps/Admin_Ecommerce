import { FormBrand } from "@/components/admin/brands/FormBrand";


interface Props {
    params: {
      id: string;
    };
  }


export default async function EditBrandPage({params}: Props) {

    const { id } = params;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brands/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        cache: "no-cache",
    })
    

    if (!response.ok) {
        return <div>Brand not found</div>;
    }


    const brand = await response.json();


  
  return (
      
    <FormBrand brand={brand} />
  );
}