import { IProductsResponseContract } from './IProducts.ts'
import { IAuthResponseContract } from './IUser.ts'

export interface IWriteOffResponseContract {
  id: string
  createdAt: string
  writeOff_code: string
  manager: IAuthResponseContract
  products: IProductsResponseContract[]
  quantity: number
  reason: string
}

export interface IWriteOffCreateContract {
  supplierId?: string | null
  productsId?: string | null
  quantity?: number
  reason: string
}
