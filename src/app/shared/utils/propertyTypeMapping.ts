export function mapTypeFromBackend(type: number): "Detached House" | "Apartment Building" | "Maisonet" {
    switch (type) {
        case 0:
            return "Detached House";
        case 1:
            return "Maisonet";
        case 2:
            return "Apartment Building";
        default:
            throw new Error(`Unknown type value: ${type}`);
    }
}