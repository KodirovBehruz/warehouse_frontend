import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetSupplies } from "./useGetSupplies";
import { useMessage } from "../../useMessages";

export const useSuppliesList = () => {
    const { error: showError } = useMessage();
    const [query, setQuery] = useSearchParams();
    const [page, setPage] = useState<number>(() => Number(query.get("page")) || 1)
    const [limit, setLimit] = useState<number>(() => Number(query.get("limit")) || 10)

    const { result, loading: isLoading, execute: getSupplies } = useGetSupplies({
        onError: () => showError("Ошибка при получении поставок"),
    })

    useEffect(() => {
        fetchSupplies()
    }, [page, limit]);

    const fetchSupplies = (resetPage = false) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        setQuery(params);

        getSupplies({ page: resetPage ? 1 : page, limit })
    }

    const onPageChange = (newPage: number, pageSize: number) => {
        setPage(newPage);
        setLimit(pageSize);

        const params = new URLSearchParams(query);
        params.set("page", String(newPage));
        params.set("limit", String(pageSize));
        setQuery(params);
    };

    return {
        supplies: result?.data || [],
        total: result?.meta?.count || 0,
        isLoading: isLoading,
        page,
        limit,
        onPageChange,
        fetchSupplies
    }
}
