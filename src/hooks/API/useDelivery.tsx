import { createContext, ReactNode, useContext } from 'react'
import {delivery} from "../../delivery";


const DeliveryContext = createContext<typeof delivery | null>(null)

export const DeliveryProvider = ({ children }: { children: ReactNode }) => {
    return (
        <DeliveryContext.Provider value={delivery}>
            {children}
        </DeliveryContext.Provider>
    )
}

export const useDelivery = () => {
    const delivery = useContext(DeliveryContext)
    if (!delivery) {
        throw new Error('useDelivery must be used within a DeliveryProvider')
    }

    return delivery
}
