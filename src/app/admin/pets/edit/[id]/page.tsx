import { FormPet } from "@/components/admin/pets/FormPet";


interface Props {
  params: {
    id: string;
  };
}


export default async function EditPetPage({params}:Props) {

  const { id } = params;
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets/${id}`,{
    method: 'GET'
    ,cache: 'no-cache'
  });

  const pet = await response.json();


  return <FormPet pet={pet} />;
}
