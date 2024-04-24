"use client";
import { deleteImage } from "@/lib/api/products";
import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  images: {
    id: number;
    url: string;
  }[];
}

const CardImages = ({ images }: Props) => {
  const router = useRouter();

  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    if (images.length === 1) {
      toast({
        title: "No se puede eliminar",
        description: "No se puede eliminar la única imagen del producto",
        className: "bg-red-500 text-white",
      });
      return;
    }

    const confirmation = window.confirm(
      "¿Estás seguro de que quieres eliminar esta imagen?"
    );

    if (!confirmation) {
      return;
    }

    const response = await deleteImage(id);

    if (response.ok) {
      toast({
        title: "Imagen eliminada",
        description: "La imagen fue eliminada correctamente",
        className: "bg-green-500 text-white",
      });

      router.refresh();
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative h-32 md:h-48 lg:h-64 overflow-hidden rounded-lg shadow-md"
        >
          <img
            src={image.url}
            className="h-full w-full object-cover"
            alt="Imagen del producto"
          />
          <button
            onClick={() => handleDelete(image.id)}
            type="button"
            className="absolute right-0 top-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardImages;
