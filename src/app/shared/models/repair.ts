export interface Repair {
    id: number;
    date: Date;
    type: string;
    description: string;
    status: number;
    cost: number;
    ownerName: string;
    ownerSurname: string;
    propertyAddress: string;
}

export interface RepairRequest{
    repairId: number;
    date: Date;
    type: string;
    status: string;
    description: string;
    cost: number;
}