import {ISuppliesResponseContract} from "../../../models/delivery/contracts/ISupplies.ts";

export interface IViewSupplyModal {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void
    supply: ISuppliesResponseContract | null
}