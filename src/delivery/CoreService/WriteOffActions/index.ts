import { HTTP_STATUSES } from '@constants/httpStatuses.ts'
import { apiRequestWrapper } from '@helpers/delivery.ts'
import { IConnector } from '@models/delivery/common/IConnector.ts'
import { GetListResponse, IApiResult } from '@models/delivery/common/IResultJSON.ts'
import { IQueryContract } from '@models/delivery/contracts/IQueryContract'
import {
  IWriteOffCreateContract,
  IWriteOffResponseContract,
} from '@models/delivery/contracts/IWriteOff.ts'
import { IWriteOffAction } from './interface.ts'

export class WriteOffActions implements IWriteOffAction {
  connector: IConnector
  constructor(connector: IConnector) {
    this.connector = connector
  }
  getList = async (
    query: IQueryContract,
  ): Promise<IApiResult<GetListResponse<IWriteOffResponseContract>>> => {
    const params: IQueryContract = {
      ...(query.search && { search: query.search }),
      ...(query.limit && { limit: query.limit }),
      ...(query.page && { page: query.page }),
    }
    return await apiRequestWrapper(
      this.connector.connector.get('writeOff', { params }),
      HTTP_STATUSES.OK,
    )
  }
  create = async (
    data: IWriteOffCreateContract,
  ): Promise<IApiResult<IWriteOffResponseContract>> => {
    return await apiRequestWrapper(
      this.connector.connector.post(`writeOff`, data),
      HTTP_STATUSES.CREATED,
    )
  }
}
