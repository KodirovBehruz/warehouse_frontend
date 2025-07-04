import { HTTP_STATUSES } from '@constants/httpStatuses.ts'
import { apiRequestWrapper } from '@helpers/delivery.ts'
import { IConnector } from '@models/delivery/common/IConnector.ts'
import { GetListResponse, IApiResult } from '@models/delivery/common/IResultJSON.ts'
import {
  IProductCreateContract,
  IProductsResponseContract,
  IProductUpdateContract,
} from '@models/delivery/contracts/IProducts.ts'
import { IQueryContract } from '@models/delivery/contracts/IQueryContract'
import { IProductsActions } from './interface.ts'

export class ProductsActions implements IProductsActions {
  connector: IConnector
  constructor(connector: IConnector) {
    this.connector = connector
  }
  getList = async (
    query: IQueryContract,
  ): Promise<IApiResult<GetListResponse<IProductsResponseContract>>> => {
    const params: IQueryContract = {
      ...(query.search && { search: query.search }),
      ...(query.limit && { limit: query.limit }),
      ...(query.page && { page: query.page }),
    }
    return await apiRequestWrapper(
      this.connector.connector.get('products', { params }),
      HTTP_STATUSES.OK,
    )
  }
  create = async (data: IProductCreateContract): Promise<IApiResult<IProductsResponseContract>> => {
    return await apiRequestWrapper(
      this.connector.connector.post(`products`, data),
      HTTP_STATUSES.CREATED,
    )
  }
  updateById = async (
    id: string,
    data: IProductUpdateContract,
  ): Promise<IApiResult<IProductsResponseContract>> => {
    return await apiRequestWrapper(
      this.connector.connector.patch(`products/${id}`, data),
      HTTP_STATUSES.OK,
    )
  }
  deleteById = async (id: string): Promise<IApiResult<null>> => {
    return await apiRequestWrapper(
      this.connector.connector.delete(`products/${id}`),
      HTTP_STATUSES.OK,
    )
  }
}
