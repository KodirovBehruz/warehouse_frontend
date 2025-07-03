export interface IUpdateSupplyModal {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    onUpdateSuccess?: (id: string) => void
    supply: any
}
