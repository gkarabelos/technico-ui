export interface PaginatedResult<T> {
    data: T[];
    totalRecords: number;
}