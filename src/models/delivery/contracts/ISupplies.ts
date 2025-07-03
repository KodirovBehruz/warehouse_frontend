import {IProductsResponseContract} from "./IProducts.ts";

export interface ISuppliesResponseContract {
    id: string
    createdAt: string
    supply_code: string
    supplier: string /*интерфейс поставщика*/
    totalPrice: number
    totalQuantity: number
    products: IProductsResponseContract[]
}

export interface ISupplyCreateContract {
    supplierId?: string | null
    products: [
        id: string,
        quantity?: number
    ]
}

export interface ISupplyUpdateContract {
    supplierId?: string | null
    products: [
        id: string,
        quantity?: number
    ]
}