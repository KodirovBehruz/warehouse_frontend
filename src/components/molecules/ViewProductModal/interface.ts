import { IProductsResponseContract } from '@models/delivery/contracts/IProducts.ts'

export interface IViewProductModal {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  product: IProductsResponseContract | null
}
