export interface Owner {
    id: number;
    vatNumber: string;
    name: string;
    surname: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
    type: number;
}

export interface OwnerRequest {
    vatNumber: string;
    name: string;
    surname: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
    type: number;
}