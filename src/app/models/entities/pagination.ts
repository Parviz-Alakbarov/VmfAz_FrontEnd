export interface Pagination{
    currentPage:number;
    itemsPerPage:number;
    totalPage:number;
    totalItems:number;
}

export class PaginationResult<T>{
    result:T[];
    pagination:Pagination;
}
