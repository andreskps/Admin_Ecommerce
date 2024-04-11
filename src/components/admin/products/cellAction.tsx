"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import { ConfirmModal } from "../../ui/confirmModal";

interface CellActionProps {
  link: string;
  id: string;
  onDeleted: (id: string) => Promise<Response>;
}

export const CellAction: React.FC<CellActionProps> = ({
  link,
  id,
  onDeleted,
}) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const onConfirm = async () => {
    const response = await onDeleted(id);

    if (!response.ok) {
      toast({
        title: "Error al eliminar el elemento",
        description: "Hubo un error al eliminar el elemento",
        className: "bg-red-500 text-white",
      });

      return;
    }

    toast({
      title: "Elemento eliminado",
      description: "El elemento se ha eliminado correctamente",
      className: "bg-green-500 text-white",
    });

    setOpen(false);

    router.refresh();
  };

  return (
    <>
  

      <ConfirmModal
        isOpen={isOpen}
        onCancel={() => setOpen(false)}
        onConfirm={onConfirm}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => router.push(`${link}/${id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
