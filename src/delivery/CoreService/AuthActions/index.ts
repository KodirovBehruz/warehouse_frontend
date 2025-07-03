import {IAuthActions} from "./interface.ts";
import {IConnector} from "../../../models/delivery/common/IConnector.ts";
import {IAuthResponseContract, ILoginContract, IRegisterContract} from "../../../models/delivery/contracts/IUser.ts";
import {IApiResult} from "../../../models/delivery/common/IResultJSON.ts";
import {apiRequestWrapper} from "../../../helpers/delivery.ts";

export class AuthActions implements IAuthActions {
    connector: IConnector
    constructor(connector: IConnector) {
        this.connector = connector
    }
    register = async (data: IRegisterContract): Promise<IApiResult<IAuthResponseContract>> => {
        return await apiRequestWrapper(
            this.connector.connector.post(`auth/register`, data),
        )
    }
    login = async (data: ILoginContract): Promise<IApiResult<IAuthResponseContract>> => {
        return await apiRequestWrapper(
            this.connector.connector.post(`auth/login`, data),
        )
    }
    getSelf = async (): Promise<IApiResult<IAuthResponseContract>> => {
        return await apiRequestWrapper(
            this.connector.connector.get('auth/self'),
        )
    }
}