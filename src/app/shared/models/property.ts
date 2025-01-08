import { Owner } from "./owner";

export interface Property {
    id: number;
    propertyId: string;
    address: string;
    yearOfConstruction: number;
    type: string;
    owner: Owner;
}

export interface PropertyRequest {
    propertyId: string;
    address: string;
    yearOfConstruction: number;
    type: string;
    ownerId: number;
}