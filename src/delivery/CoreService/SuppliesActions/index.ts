import {ISuppliesActions} from "./interface.ts";
import {IConnector} from "../../../models/delivery/common/IConnector.ts";
import {GetListResponse, IApiResult} from "../../../models/delivery/common/IResultJSON.ts";
import {apiRequestWrapper} from "../../../helpers/delivery.ts";
import {HTTP_STATUSES} from "../../../constants/httpStatuses.ts";
import {IQueryContract} from "../../../models/delivery/contracts/IQueryContract";
import {
    ISuppliesResponseContract,
    ISupplyCreateContract,
    ISupplyUpdateContract
} from "../../../models/delivery/contracts/ISupplies.ts";

export class SuppliesActions implements ISuppliesActions {
    connector: IConnector
    constructor(connector: IConnector) {
        this.connector = connector
    }
    getList = async (
        query: IQueryContract,
    ): Promise<IApiResult<GetListResponse<ISuppliesResponseContract>>> => {
        const params: IQueryContract = {
            ...(query.search && { search: query.search }),
            ...(query.limit && { limit: query.limit }),
            ...(query.page && { page: query.page }),
        }
        return await apiRequestWrapper(
            this.connector.connector.get(`supplies`, { params }),
            HTTP_STATUSES.OK,
        )
    }
    create = async (data: ISupplyCreateContract): Promise<IApiResult<ISuppliesResponseContract>> => {
        return await apiRequestWrapper(
            this.connector.connector.post(`supplies`, data),
            HTTP_STATUSES.CREATED,
        )
    }
    deleteById = async (id: string): Promise<IApiResult<null>> => {
        return await apiRequestWrapper(
            this.connector.connector.delete(`supplies/${id}`),
            HTTP_STATUSES.OK,
        )
    }
    updateById = async (id: string, data: ISupplyUpdateContract): Promise<IApiResult<ISuppliesResponseContract>> => {
        return await apiRequestWrapper(
            this.connector.connector.put(`supplies/${id}`, data),
            HTTP_STATUSES.OK,
        )
    }
}