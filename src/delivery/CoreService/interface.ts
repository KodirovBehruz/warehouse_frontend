import { IConnector } from '../../models/delivery/common/IConnector.ts'
import { IProductsActions } from './ProductsActions/interface.ts'
import { IReportsAction } from './ReportsActions/interface.ts'
import { ISuppliesActions } from './SuppliesActions/interface.ts'
import { IWriteOffAction } from './WriteOffActions/interface.ts'

export interface ICoreService {
  connector: IConnector
  productsActions: IProductsActions
  suppliesActions: ISuppliesActions
  writeOffActions: IWriteOffAction
  reportsActions: IReportsAction
}
