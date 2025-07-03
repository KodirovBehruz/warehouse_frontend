import {IApiResult} from "../../models/delivery/common/IResultJSON.ts";
import {useState} from "react";

export const useFetch = <T,>({
    asyncFunction,
    onSuccess,
    onError
}: {
    asyncFunction: (...params: any) => Promise<IApiResult<T>>,
    onSuccess?: (value: IApiResult<T>) => void
    onError?: (error: string | null) => void
}) => {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)
    const execute = async (...params: any) => {
        setLoading(true)
        const response: IApiResult<T> = await asyncFunction(...params)
        setLoading(false)
        if (response.error) {
            setError(response.error)
            onError?.(response.error)
            return
        }
        onSuccess?.(response)
        setResult(response.value ?? null)
    }
    return { result, loading, error, execute }
}