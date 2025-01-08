import { Property } from "./property";

export interface Repair {
    id: number;
    date: Date;
    type: string;
    description: string;
    status: string;
    cost: number;
    property: Property;
}