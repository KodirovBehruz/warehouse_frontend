import {IProductsResponseContract} from "./IProducts.ts";

export interface IWriteOffResponseContract {
    id: string
    createdAt: string
    writeOff_code: string
    manager: string
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