

export interface OrderSchema{
    id: string;
    email: string;
    phone: string;
    name: string;
    lastName:string;
    namePet: string;
    totalAmount: number;
    isPaid: boolean;
    orderStatus: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
}