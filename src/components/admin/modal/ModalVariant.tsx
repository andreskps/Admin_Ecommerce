import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { FormValues } from "../form/FormProduct";

interface Props {
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
  values: FormValues;
}

export const ModalVariant = ({ setValues, values }: Props) => {

  const [setIsOpen,IsOpen] = useState(false);

    const [valuesVariant,setValuesVariant] = useState({
        attribute: "",
        value: "",
        stock: 0,
        price: 0,
      
    })

    const handleSubmit = () => {
        setValues({ ...values, variants: [...values.variants, valuesVariant] });
        setValuesVariant({
            attribute: "",
            value: "",
            stock: 0,
            price: 0,
            });

        
    }
    

  return (
    <Dialog isOpen={IsOpen} onClose={() => IsOpen(false)}>
      <DialogTrigger asChild>
        <Button variant="outline"
        onClick={() => IsOpen(true)}
        >Agregar Variante</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear variante</DialogTitle>
        </DialogHeader>
        <div className="border-t pt-6 grid gap-2">
          <div className="grid gap-2">
            <Label className="text-lg" htmlFor="attribute">
              Atributo
            </Label>
            <Select onValueChange={(value) => setValuesVariant({ ...valuesVariant, attribute: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="min-w-[150px]">
                <SelectItem value="color">Color</SelectItem>
                <SelectItem value="size">Size</SelectItem>
                <SelectItem value="material">Material</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label className="text-lg" htmlFor="value">
              Valor
            </Label>
            <Input id="value" 
            onChange={(e) => setValuesVariant({ ...valuesVariant, value: e.target.value })}
            placeholder="valor del atributo" />
            <div />
          </div>
          <div className="grid gap-2">
            <Label className="text-lg" htmlFor="stock">
              Stock
            </Label>
            <Input id="stock" 
            onChange={(e) => setValuesVariant({ ...valuesVariant, stock: parseInt(e.target.value) })}
            type="number" />

            <div className="w-24" />
          </div>
          <div className="grid gap-2">
            <Label className="text-lg" htmlFor="price">
              Price
            </Label>
            <Input id="price" type="number" 
            onChange={(e) => setValuesVariant({ ...valuesVariant, price: parseFloat(e.target.value) })}
            placeholder="Precio" />
            <div className="w-24" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>

          <DialogClose asChild>
          <Button onClick={handleSubmit} type="button">
            Agregar
          </Button>
          </DialogClose>

          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
