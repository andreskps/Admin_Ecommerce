import { FormCoupon } from "@/components/admin/coupons/FormCoupon";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditCouponPage({ params }: Props) {
  const { id } = params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/coupons/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next:{
        revalidate: 1,
      }
    } 
  );

  if (!response.ok) {
    return <div>Coupon not found</div>;
  }

  const coupon = await response.json();

  return <FormCoupon coupon={coupon} />;
}
