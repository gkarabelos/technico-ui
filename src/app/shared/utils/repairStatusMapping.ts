export function mapStatusFromBackend(type: number): "Pending" | "In Progress" | "Complete" {
    switch (type) {
        case 0:
            return "Pending";
        case 1:
            return "In Progress";
        case 2:
            return "Complete";
        default:
            throw new Error(`Unknown type value: ${type}`);
    }
}