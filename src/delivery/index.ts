import {IDelivery} from "./interface.ts";
import {ICoreService} from "./CoreService/interface.ts";
import {CoreService} from "./CoreService";

class Delivery implements IDelivery {
    CS: ICoreService

    constructor() {
        this.CS = new CoreService()
    }
}

export const delivery = new Delivery()