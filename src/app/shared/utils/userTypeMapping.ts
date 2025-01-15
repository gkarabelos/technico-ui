export function mapUserTypeFromBackend(type: number): "Admin" | "Owner" {
    switch (type) {
        case 0:
            return "Admin";
        case 1:
            return "Owner";
        default:
            throw new Error(`Unknown type value: ${type}`);
    }
}