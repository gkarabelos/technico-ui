export interface Property {
    id: number;
    propertyId: string;
    address: string;
    yearOfConstruction: number;
    type: string;
    vatNumber: string;
}

export interface PropertyRequest {
    propertyId: string;
    address: string;
    yearOfConstruction: number;
    type: string;
    ownerId: number;
}