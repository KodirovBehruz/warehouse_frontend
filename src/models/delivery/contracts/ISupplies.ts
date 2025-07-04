import { IProductsResponseContract } from './IProducts.ts'
import { IAuthResponseContract } from './IUser.ts'

export interface ISuppliesResponseContract {
  id: string
  createdAt: string
  supply_code: string
  supplier: IAuthResponseContract
  totalPrice: number
  totalQuantity: number
  products: IProductsResponseContract[]
}

export interface ISupplyCreateContract {
  supplierId?: string | null
  products: [id: string, quantity?: number]
}

export interface ISupplyUpdateContract {
  supplierId?: string | null
  products: [id: string, quantity?: number]
}
