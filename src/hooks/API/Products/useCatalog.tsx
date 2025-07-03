import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetProducts } from "./useGetProducts";
import { useMessage } from "../../useMessages";

export const useCatalog = () => {
    const { error: showError } = useMessage();
    const [query, setQuery] = useSearchParams();
    const [page, setPage] = useState<number>(() => Number(query.get("page")) || 1);
    const [limit, setLimit] = useState<number>(() => Number(query.get("limit")) || 5);
    const [lastModified, setLastModified] = useState<string | null>(null); // Состояние для Last-Modified

    const { result, loading: isLoading, execute: getProducts } = useGetProducts({
        onError: () => showError("Ошибка при получении товаров"),
    });

    useEffect(() => {
        fetchProducts();
    }, [page, limit]);

    const fetchProducts = async (resetPage = false) => {
        if (resetPage) setPage(1);
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        setQuery(params);

        // Добавляем If-Modified-Since, если есть значение lastModified
        const headers: HeadersInit = {};
        if (lastModified) {
            headers['If-Modified-Since'] = lastModified;
        }

        // Получаем продукты
        await getProducts({ page: resetPage ? 1 : page, limit, headers })
            .then((response) => {
                // Обновляем дату последнего изменения из ответа
                const newLastModified = response.headers.get('Last-Modified');
                if (newLastModified) {
                    setLastModified(newLastModified);  // Сохраняем дату последнего изменения
                }
            });
    };

    const onPageChange = (newPage: number, pageSize: number) => {
        setPage(newPage);
        setLimit(pageSize);

        const params = new URLSearchParams(query);
        params.set("page", String(newPage));
        params.set("limit", String(pageSize));
        setQuery(params);
    };

    return {
        products: result?.data || [],
        total: result?.meta?.count || 0,
        isLoading: isLoading,
        page,
        limit,
        onPageChange,
        fetchProducts
    };
};
