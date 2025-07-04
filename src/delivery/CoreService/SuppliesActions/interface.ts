import { IConnector } from '@models/delivery/common/IConnector.ts'
import { GetListResponse, IApiResult } from '@models/delivery/common/IResultJSON.ts'
import { IQueryContract } from '@models/delivery/contracts/IQueryContract.ts'
import {
  ISuppliesResponseContract,
  ISupplyCreateContract,
  ISupplyUpdateContract,
} from '@models/delivery/contracts/ISupplies.ts'

export interface ISuppliesActions {
  connector: IConnector
  getList(query: IQueryContract): Promise<IApiResult<GetListResponse<ISuppliesResponseContract>>>
  create(data: ISupplyCreateContract): Promise<IApiResult<ISuppliesResponseContract>>
  deleteById(id: string): Promise<IApiResult<null>>
  updateById(
    id: string,
    data: ISupplyUpdateContract,
  ): Promise<IApiResult<ISuppliesResponseContract>>
}
