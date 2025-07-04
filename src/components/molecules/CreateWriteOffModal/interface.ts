export interface ICreateWriteOffModal {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onCreateSuccess?: (id: string) => void
}
