import {IConnector} from "../../../models/delivery/common/IConnector.ts";
import {GetListResponse, IApiResult} from "../../../models/delivery/common/IResultJSON.ts";
import {IQueryContract} from "../../../models/delivery/contracts/IQueryContract.ts";
import {IWriteOffCreateContract, IWriteOffResponseContract} from "../../../models/delivery/contracts/IWriteOff.ts";

export interface IWriteOffAction {
    connector: IConnector
    getList(query: IQueryContract): Promise<IApiResult<GetListResponse<IWriteOffResponseContract>>>
    create(data: IWriteOffCreateContract): Promise<IApiResult<IWriteOffResponseContract>>
}