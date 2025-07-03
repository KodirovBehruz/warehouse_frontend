export interface ICreateSupplyModal {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    onCreateSuccess?: (id: string) => void
}
