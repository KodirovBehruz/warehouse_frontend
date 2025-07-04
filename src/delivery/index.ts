import { CoreService } from './CoreService'
import { ICoreService } from './CoreService/interface.ts'
import { IDelivery } from './interface.ts'

class Delivery implements IDelivery {
  CS: ICoreService

  constructor() {
    this.CS = new CoreService()
  }
}

export const delivery = new Delivery()
