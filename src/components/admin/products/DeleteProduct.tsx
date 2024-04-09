import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { deleteProduct } from "@/lib/api/products";

import { useToast } from "@/components/ui/use-toast";
  
import React from 'react'


interface Props {
    productId:string;
}

export const DeleteProduct = ({productId}:Props) => {

    const {toast} = useToast()


    const handleDelete = async () => {
         const response = await deleteProduct(productId)


         if(!response.ok){
            toast({
                title: "Error al eliminar producto",
                description: "Hubo un error al eliminar el producto",
                className: "bg-red-500 text-white",
              });

              return;
         }

         toast({
            title: "Producto eliminado",
            description: "El producto se ha eliminado correctamente",
    
            className: "bg-green-500 text-white",
          });


    }


  return (
    <AlertDialog>
  <AlertDialogTrigger
  className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground  cursor-pointer hover:bg-accent hover:text-accent-foreground"
  >Eliminar </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
      onClick={handleDelete}
      >Eliminar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}
