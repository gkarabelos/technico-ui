export interface Repair {
    id: number;
    date: Date;
    type: string;
    description: string;
    status: number;
    cost: number;
    ownerName: string;        //lamvanei apo back
    ownerSurname: string;
    propertyAddress: string;
}

export interface CreateRepairRequest{

    date : Date;
    type : string;
    status : number;           //stelnei sto back,tha prepei na exei ta pedia  tou endpoint
    description : string;
    cost : number; 
    propertyId: number;
}
export interface UpdateRepairRequest{
    repairId: number;
    date: Date;
    type: string;
    status: string;
    description: string;
    cost: number;

}