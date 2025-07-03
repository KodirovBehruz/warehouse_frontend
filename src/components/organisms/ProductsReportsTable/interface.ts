import {IProductsResponseContract} from "../../../models/delivery/contracts/IProducts.ts";

export interface IProductsReportsTable {
    data?: IProductsResponseContract[],
    onDeleteSuccess?: () => void
}