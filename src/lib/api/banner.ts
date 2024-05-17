import { getSession as getSessionClient } from "next-auth/react";

interface createBannerProps {
  name: string;
  files: File[];
}

export const createBanner = async ({ name, files }: createBannerProps) => {
  const session = await getSessionClient();

  if (!session || !session.user?.access_token) {
    throw new Error("No se pudo obtener la sesión o el token de acceso.");
  }
  const formData = new FormData();
  formData.append("name", name);
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/banners`,
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
      },
    }
  );

  return response;
};



export const deleteBanner = async (id: string) => {
  const session = await getSessionClient();

  if (!session || !session.user?.access_token) {
    throw new Error("No se pudo obtener la sesión o el token de acceso.");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/banners/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
      },
    }
  );

  return response;
}
