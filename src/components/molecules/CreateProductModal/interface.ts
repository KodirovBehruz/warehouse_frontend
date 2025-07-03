export interface ICreateProductModal {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    onCreateSuccess?: (id: string) => void
}
