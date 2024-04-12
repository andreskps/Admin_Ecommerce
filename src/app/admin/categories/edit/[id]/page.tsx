import { FormCategories } from "@/components/admin/categories/FormCategories";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditCategoryPage({ params }: Props) {
  const { id } = params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  const category = await response.json();


  return <FormCategories category={category} />;
}
