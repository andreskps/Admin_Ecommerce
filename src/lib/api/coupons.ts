import { Coupon } from "@/validations/couponSchema";

import  {getSession as getSessionClient} from "next-auth/react";


export const createCoupon = async (coupon: Coupon) => {

    const session = await getSessionClient();

    if (!session || !session.user?.access_token) {
        throw new Error("No se pudo obtener la sesión o el token de acceso.");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${session.user.access_token}`,
        },
        body: JSON.stringify(coupon)
    });

    return response

}

export const updateCoupon = async (coupon: Coupon) => {

    const {id,expiresAt,startsAt,...res} = coupon

    const session = await getSessionClient();

    if (!session || !session.user?.access_token) {
        throw new Error("No se pudo obtener la sesión o el token de acceso.");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${session.user.access_token}`,
        },
        body: JSON.stringify({
            startsAt: coupon.startsAt === "" ? null : coupon.startsAt,
            expiresAt: coupon.expiresAt === "" ? null : coupon.expiresAt,
            ...res
        })
    });

    return response
}