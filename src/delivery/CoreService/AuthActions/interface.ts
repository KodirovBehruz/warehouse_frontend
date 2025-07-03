import {IConnector} from "../../../models/delivery/common/IConnector.ts";
import {
    ILoginContract,
    IRegisterContract,
    IAuthResponseContract
} from "../../../models/delivery/contracts/IUser.ts";
import {IApiResult} from "../../../models/delivery/common/IResultJSON.ts";

export interface IAuthActions {
    connector: IConnector;
    register(data: IRegisterContract): Promise<IApiResult<IAuthResponseContract>>
    login(data: ILoginContract): Promise<IApiResult<IAuthResponseContract>>
    getSelf(): Promise<IApiResult<IAuthResponseContract>>
}