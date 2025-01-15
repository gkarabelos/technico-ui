export interface Property {
    id: number;
    e9: string;
    address: string;
    yearOfConstruction: number;
    type: number;
    vatNumber: string;
}

export interface PropertyRequest {
    E9: string;
    address: string;
    yearOfConstruction: number;
    type: string;
    ownerId: number;
}