export interface IResponeList<T> {
    currentPage: number;
    items: T[];
    pageSize: number;
    totalItems: number;
}