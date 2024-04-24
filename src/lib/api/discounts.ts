import { Discount } from "@/validations/discountSchema";

import { getSession as getSessionClient } from "next-auth/react";

export const createDiscount = async (discount: Discount) => {
  const session = await getSessionClient();

  if (!session || !session.user?.access_token) {
    throw new Error("No se pudo obtener la sesión o el token de acceso.");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/discounts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${session.user.access_token}`,
      },
      body: JSON.stringify(discount),
    }
  );

  return response;
};

export const updateDiscount = async (discount: Discount) => {
  const { id, expiresAt, startsAt, ...res } = discount;

  const session = await getSessionClient();

  if (!session || !session.user?.access_token) {
    throw new Error("No se pudo obtener la sesión o el token de acceso.");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/discounts/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${session.user.access_token}`,
      },
      body: JSON.stringify({
        startsAt: discount.startsAt === "" ? null : discount.startsAt,
        expiresAt: discount.expiresAt === "" ? null : discount.expiresAt,
        ...res,
      }),
    }
  );

  return response;
};
