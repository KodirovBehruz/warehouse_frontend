import {ICoreService} from "./interface.ts";
import {IConnector} from "../../models/delivery/common/IConnector.ts";
import {ApiConnector} from "../../helpers/connector.ts";
import {IProductsActions} from "./ProductsActions/interface.ts";
import {ProductsActions} from "./ProductsActions";
import {ISuppliesActions} from "./SuppliesActions/interface.ts";
import {SuppliesActions} from "./SuppliesActions";
import {IWriteOffAction} from "./WriteOffActions/interface.ts";
import {WriteOffActions} from "./WriteOffActions";
import {IAuthActions} from "./AuthActions/interface.ts";
import {AuthActions} from "./AuthActions";
import {IReportsAction} from "./ReportsActions/interface.ts";
import {ReportsActions} from "./ReportsActions";


export class CoreService implements ICoreService {
    connector: IConnector
    productsActions: IProductsActions
    suppliesActions: ISuppliesActions
    writeOffActions: IWriteOffAction
    reportsActions: IReportsAction
    authActions: IAuthActions

    constructor() {
        this.connector = new ApiConnector("/api")
        this.productsActions = new ProductsActions(this.connector)
        this.suppliesActions = new SuppliesActions(this.connector)
        this.writeOffActions = new WriteOffActions(this.connector)
        this.reportsActions = new ReportsActions(this.connector)
        this.authActions = new AuthActions(this.connector)
    }
}