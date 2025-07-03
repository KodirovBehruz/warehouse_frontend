import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {useGetSuppliesReports} from "./useGetSupplies";
import { useMessage } from "../../useMessages";

export const useSuppliesReportsList = (active: boolean) => {
    const { error: showError } = useMessage();
    const [query, setQuery] = useSearchParams();
    const [page, setPage] = useState<number>(() => Number(query.get("page")) || 1)
    const [limit, setLimit] = useState<number>(() => Number(query.get("limit")) || 10)
    const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null)

    const { result, loading: isLoading, execute: getSuppliesReports } = useGetSuppliesReports({
        onError: () => showError("Ошибка при получении отчета"),
    })

    useEffect(() => {
        if (!active) return
        fetchSuppliesReports()
    }, [page, limit, dateRange, active]);

    const fetchSuppliesReports = (resetPage = false) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (dateRange) {
            params.set("startDate", dateRange[0].format("YYYY-MM-DD"));
            params.set("endDate", dateRange[1].format("YYYY-MM-DD"));
        }
        setQuery(params);

        getSuppliesReports({
            page: resetPage ? 1 : page,
            limit,
            startDate: dateRange ? dateRange[0].format("YYYY-MM-DD") : undefined,
            endDate: dateRange ? dateRange[1].format("YYYY-MM-DD") : undefined,
        });
    }

    const onPageChange = (newPage: number, pageSize: number) => {
        setPage(newPage);
        setLimit(pageSize);

        const params = new URLSearchParams(query);
        params.set("page", String(newPage));
        params.set("limit", String(pageSize));
        setQuery(params);
    };

    const onDateChange = (dates: [moment.Moment, moment.Moment] | null) => {
        setDateRange(dates);
        setPage(1)
    }

    return {
        suppliesReports: result?.data || [],
        suppliesCount: result?.meta?.count || 0,
        suppliesSum: result?.meta?.totalSum || 0,
        isSuppliesLoading: isLoading,
        suppliesPage: page,
        suppliesLimit: limit,
        onSuppliesPageChange: onPageChange,
        onSuppliesDateChange: onDateChange,
        fetchSuppliesReports
    }
}
