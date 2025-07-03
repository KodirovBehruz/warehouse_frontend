import {IAuthActions} from "./interface.ts";
import {IConnector} from "../../../models/delivery/common/IConnector.ts";
import {IAuthResponseContract} from "../../../models/delivery/contracts/IUser.ts";
import {IApiResult} from "../../../models/delivery/common/IResultJSON.ts";
import {apiRequestWrapper} from "../../../helpers/delivery.ts";

export class AuthActions implements IAuthActions {
    connector: IConnector
    constructor(connector: IConnector) {
        this.connector = connector
    }
    getSelf = async (): Promise<IApiResult<IAuthResponseContract>> => {
        return await apiRequestWrapper(
            this.connector.connector.get('auth/self'),
        )
    }
}