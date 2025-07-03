import { IConnector } from '../../../models/delivery/common/IConnector.ts'
import { IApiResult } from '../../../models/delivery/common/IResultJSON.ts'
import { IAuthResponseContract } from '../../../models/delivery/contracts/IUser.ts'

export interface IAuthActions {
	connector: IConnector
	getSelf(): Promise<IApiResult<IAuthResponseContract>>
}
