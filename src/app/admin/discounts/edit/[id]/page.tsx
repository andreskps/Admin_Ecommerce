import { FormDiscounts } from "@/components/admin/discounts/FormDiscounts";


interface Props {
  params: {
    id: string;
  };
}
export default async function EditDiscountPage({params}:Props) {

  const { id } = params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/discounts/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-cache",
  })

  if (!response.ok) {
    return <div>Discount not found</div>;
  }

  const discount = await response.json();

  


  return (
    <FormDiscounts discount={discount} />
  );
}