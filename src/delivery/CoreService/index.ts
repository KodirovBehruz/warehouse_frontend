import { ApiConnector } from '../../helpers/connector.ts'
import { IConnector } from '../../models/delivery/common/IConnector.ts'
import { ICoreService } from './interface.ts'
import { ProductsActions } from './ProductsActions'
import { IProductsActions } from './ProductsActions/interface.ts'
import { ReportsActions } from './ReportsActions'
import { IReportsAction } from './ReportsActions/interface.ts'
import { SuppliesActions } from './SuppliesActions'
import { ISuppliesActions } from './SuppliesActions/interface.ts'
import { WriteOffActions } from './WriteOffActions'
import { IWriteOffAction } from './WriteOffActions/interface.ts'

export class CoreService implements ICoreService {
  connector: IConnector
  productsActions: IProductsActions
  suppliesActions: ISuppliesActions
  writeOffActions: IWriteOffAction
  reportsActions: IReportsAction

  constructor() {
    this.connector = new ApiConnector('/api')
    this.productsActions = new ProductsActions(this.connector)
    this.suppliesActions = new SuppliesActions(this.connector)
    this.writeOffActions = new WriteOffActions(this.connector)
    this.reportsActions = new ReportsActions(this.connector)
  }
}
