export interface Repair {
    id: number;
    date: Date;
    type: string;
    description: string;
    status: string;
    cost: number;
    ownerName: string;        //lamvanei apo back
    ownerSurname: string;
    propertyAddress: string;
}

export interface RepairRequest{
    date : Date;
    type : string;
    status : number;           //stelnei sto back,tha prepei na exei ta pedia  tou endpoint
    description : string;
    cost : number; 
    propertyId: number;
}