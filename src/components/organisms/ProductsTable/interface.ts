import { IProductsResponseContract } from '@models/delivery/contracts/IProducts.ts'

export interface IProductsTable {
  data?: IProductsResponseContract[]
  onDeleteSuccess?: () => void
  onUpdateSuccess?: () => void
}
