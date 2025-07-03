import {ISuppliesResponseContract} from "../../../models/delivery/contracts/ISupplies.ts";

export interface ISuppliesTable {
    data?: ISuppliesResponseContract[],
    onDeleteSuccess?: () => void
}