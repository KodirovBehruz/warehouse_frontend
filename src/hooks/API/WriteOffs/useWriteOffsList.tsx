import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMessage } from "../../useMessages";
import {useGetWriteOffs} from "./useGetWriteOffs.tsx";

export const useWriteOffsList = () => {
    const { error: showError } = useMessage();
    const [query, setQuery] = useSearchParams();
    const [page, setPage] = useState<number>(() => Number(query.get("page")) || 1)
    const [limit, setLimit] = useState<number>(() => Number(query.get("limit")) || 10)

    const { result, loading: isLoading, execute: getWriteOffs } = useGetWriteOffs({
        onError: () => showError("Ошибка при получении списанных товаров"),
    })

    useEffect(() => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        setQuery(params);

        getWriteOffs({ page, limit })
    }, [page, limit]);

    const onPageChange = (newPage: number, pageSize: number) => {
        setPage(newPage);
        setLimit(pageSize);

        const params = new URLSearchParams(query);
        params.set("page", String(newPage));
        params.set("limit", String(pageSize));
        setQuery(params);
    };

    return {
        writeOffs: result?.data || [],
        total: result?.meta?.count || 0,
        isLoading: isLoading,
        page,
        limit,
        onPageChange
    }
}
