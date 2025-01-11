export interface Repair {
    id: number;
    date: Date;
    type: string;
    description: string;
    status: string;
    cost: number;
    ownerName: string;
    ownerSurname: string;
    propertyAddress: string;
}