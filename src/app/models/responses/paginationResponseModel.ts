import { Pagination } from "../entities/pagination";
import { ResponseModel } from "./responseModel";

export interface PaginationResponseModel<T> extends ResponseModel{
    data:T[];
    pagination:Pagination;
}