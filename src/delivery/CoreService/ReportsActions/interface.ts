import {IConnector} from "../../../models/delivery/common/IConnector.ts";
import {GetListResponse, IApiResult} from "../../../models/delivery/common/IResultJSON.ts";
import {IQueryContract} from "../../../models/delivery/contracts/IQueryContract.ts";
import {ISuppliesResponseContract} from "../../../models/delivery/contracts/ISupplies.ts";
import {IProductsResponseContract} from "../../../models/delivery/contracts/IProducts.ts";
import {IWriteOffResponseContract} from "../../../models/delivery/contracts/IWriteOff.ts";

export interface IReportsAction {
    connector: IConnector
    getProductsReportsList(query: IQueryContract): Promise<IApiResult<GetListResponse<IProductsResponseContract>>>
    getSuppliesReportsList(query: IQueryContract): Promise<IApiResult<GetListResponse<ISuppliesResponseContract>>>
    getWriteOffReportsList(query: IQueryContract): Promise<IApiResult<GetListResponse<IWriteOffResponseContract>>>
}