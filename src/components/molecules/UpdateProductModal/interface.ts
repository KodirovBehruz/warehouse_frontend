export interface IUpdateProductModal {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onUpdateSuccess?: (id: string) => void
  product: any
}
