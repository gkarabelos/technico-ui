export interface Property {
    id: number;
    E9: string;
    address: string;
    yearOfConstruction: number;
    type: string;
    vatNumber: string;
}

export interface PropertyRequest {
    E9: string;
    address: string;
    yearOfConstruction: number;
    type: string;
    ownerId: number;
}