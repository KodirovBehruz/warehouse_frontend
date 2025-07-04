import { IConnector } from '@models/delivery/common/IConnector.ts'
import { GetListResponse, IApiResult } from '@models/delivery/common/IResultJSON.ts'
import {
  IProductCreateContract,
  IProductsResponseContract,
  IProductUpdateContract,
} from '@models/delivery/contracts/IProducts.ts'
import { IQueryContract } from '@models/delivery/contracts/IQueryContract.ts'

export interface IProductsActions {
  connector: IConnector
  getList(query: IQueryContract): Promise<IApiResult<GetListResponse<IProductsResponseContract>>>
  create(data: IProductCreateContract): Promise<IApiResult<IProductsResponseContract>>
  deleteById(id: string): Promise<IApiResult<null>>
  updateById(
    id: string,
    data: IProductUpdateContract,
  ): Promise<IApiResult<IProductsResponseContract>>
}
