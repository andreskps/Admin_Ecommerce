import { FormPet } from "@/components/admin/pets/FormPet";

export default function EditPetPage() {
  const pet = {
    name: "Perrito",
  };
  return <FormPet pet={pet} />;
}
