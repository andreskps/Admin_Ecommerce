import { FormCategories } from "@/components/admin/categories/FormCategories";



interface Props {
  params: {
    id: string;
  };
}


export default function EditCategoryPage({params}:Props) {


  const category = {
    id: 1,
    name: "Category",
    subcategories: [
      {
        id: 1,
        name: "Subcategory 1",
      },
      {
        id: 2,
        name: "Subcategory 2",
      },
    ],
  };



  return (
      <FormCategories  category={category}/>
  );
}