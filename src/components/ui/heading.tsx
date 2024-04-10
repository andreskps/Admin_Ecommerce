"use client"


import { Plus } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

interface HeadingProps {
    title: string;
    description: string;
    link:string;
  }
  
  export const Heading: React.FC<HeadingProps> = ({ title, description,link }) => {
    const router = useRouter();
    return (
      <>
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
       <Button
       className="text-xs md:text-sm"
       onClick={() => router.push(link)}
     >
         <Plus className="mr-2 h-4 w-4" /> Add New
     </Button>

</>



     
    );
  };