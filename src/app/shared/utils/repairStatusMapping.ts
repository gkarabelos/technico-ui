export function mapTypeFromBackend(status: number): "Pending" | "In Progress" | "Complete" {
    switch (status) {
        case 0:
            return "Pending";
        case 1:
            return "In Progress";
        case 2:
            return "Complete";
        default:
            throw new Error(`Unknown status value: ${status}`);
    }
}