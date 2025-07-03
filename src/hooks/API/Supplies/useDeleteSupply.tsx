import {useDelivery} from "../useDelivery.tsx";
import {useFetch} from "../useFetch.tsx";


export const useDeleteSupply = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void
    onError?: () => void
}) => {
    const delivery = useDelivery()
    const { execute, loading, result } = useFetch<null>({
        asyncFunction: delivery.CS.suppliesActions.deleteById,
        onSuccess,
        onError,
    })
    return { result, loading, execute }
}
