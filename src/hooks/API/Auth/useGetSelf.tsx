import {useDelivery} from "../useDelivery.tsx";
import {useFetch} from "../useFetch.tsx";
import {useEffect} from "react";

export const useGetSelf = ({ onSuccess, onError }: {
    onSuccess?: () => void
    onError?: () => void
}) => {
    const delivery = useDelivery()
    const {result, loading, execute} = useFetch({
        asyncFunction: () =>
            delivery.CS.authActions.getSelf(),
            onSuccess,
            onError
    })

    useEffect(() => {
    }, [result])
    return { result, loading, execute }
}
