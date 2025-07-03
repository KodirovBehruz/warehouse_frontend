import {IWriteOffResponseContract} from "../../../models/delivery/contracts/IWriteOff.ts";

export interface IViewWriteOffModal {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void
    writeOff: IWriteOffResponseContract | null
}