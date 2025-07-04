import { IManagerResponseContract } from '../delivery/contracts/IManager.ts'

export interface IAuth {
  token: string
  manager: IManagerResponseContract
  setTokens: (token: string) => void
  setManager: (manager: IManagerResponseContract) => void
  refresh: () => void
  logout: () => void
  getSelf: () => void
}
