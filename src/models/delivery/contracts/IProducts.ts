import { IManagerResponseContract } from './IManager.ts'

export interface IProductsResponseContract {
  id: string
  createdAt: string
  name: string
  slug: string
  product_code: string
  unitPrice: string
  quantity: number
  manager: IManagerResponseContract
}

export interface IProductCreateContract {
  name?: string
  unitPrice?: string
  quantity?: number
}

export interface IProductUpdateContract {
  name?: string
  unitPrice?: string
  quantity?: number
}
