import {IReportsAction} from "./interface.ts";
import {IConnector} from "../../../models/delivery/common/IConnector.ts";
import {GetListResponse, IApiResult} from "../../../models/delivery/common/IResultJSON.ts";
import {apiRequestWrapper} from "../../../helpers/delivery.ts";
import {HTTP_STATUSES} from "../../../constants/httpStatuses.ts";
import {IQueryContract} from "../../../models/delivery/contracts/IQueryContract";
import {ISuppliesResponseContract} from "../../../models/delivery/contracts/ISupplies.ts";
import {IProductsResponseContract} from "../../../models/delivery/contracts/IProducts.ts";
import {IWriteOffResponseContract} from "../../../models/delivery/contracts/IWriteOff.ts";

export class ReportsActions implements IReportsAction {
    connector: IConnector
    constructor(connector: IConnector) {
        this.connector = connector
    }
    getProductsReportsList = async (
        query: IQueryContract,
        ): Promise<IApiResult<GetListResponse<IProductsResponseContract>>> => {
        const params: IQueryContract = {
            ...(query.search && { search: query.search }),
            ...(query.limit && { limit: query.limit }),
            ...(query.page && { page: query.page }),
            ...(query.startDate && { startDate: query.startDate }),
            ...(query.endDate && { endDate: query.endDate }),
        }
        return await apiRequestWrapper(
            this.connector.connector.get("reports/products", { params }),
        )
    }
    getSuppliesReportsList = async (
        query: IQueryContract,
    ): Promise<IApiResult<GetListResponse<ISuppliesResponseContract>>> => {
        const params: IQueryContract = {
            ...(query.search && { search: query.search }),
            ...(query.limit && { limit: query.limit }),
            ...(query.page && { page: query.page }),
            ...(query.startDate && { startDate: query.startDate }),
            ...(query.endDate && { endDate: query.endDate }),
        }
        return await apiRequestWrapper(
            this.connector.connector.get("reports/supplies", { params }),
            HTTP_STATUSES.OK,
        )
    }
    getWriteOffReportsList = async (
        query: IQueryContract,
        ): Promise<IApiResult<GetListResponse<IWriteOffResponseContract>>> => {
        const params: IQueryContract = {
            ...(query.search && { search: query.search }),
            ...(query.limit && { limit: query.limit }),
            ...(query.page && { page: query.page }),
            ...(query.startDate && { startDate: query.startDate }),
            ...(query.endDate && { endDate: query.endDate }),
        }
        return await apiRequestWrapper(
            this.connector.connector.get("reports/writeOff", { params }),
            HTTP_STATUSES.OK,
        )
    }
}