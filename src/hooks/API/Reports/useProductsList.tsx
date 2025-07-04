import { useMessage } from '@hooks/useMessages.tsx'
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetProductsReports } from './useGetProducts.tsx'

export const useProductsReportsList = (active: boolean) => {
  const { error: showError } = useMessage()
  const [query, setQuery] = useSearchParams()
  const [page, setPage] = useState<number>(() => Number(query.get('page')) || 1)
  const [limit, setLimit] = useState<number>(() => Number(query.get('limit')) || 10)
  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null)

  const {
    result,
    loading: isLoading,
    execute: getProductsReports,
  } = useGetProductsReports({
    onError: () => showError('Ошибка при получении отчета'),
  })

  const fetchProductsReports = useCallback(
    (resetPage = false) => {
      const params = new URLSearchParams()
      params.set('page', String(page))
      params.set('limit', String(limit))
      if (dateRange) {
        params.set('startDate', dateRange[0].format('YYYY-MM-DD'))
        params.set('endDate', dateRange[1].format('YYYY-MM-DD'))
      }
      setQuery(params)

      getProductsReports({
        page: resetPage ? 1 : page,
        limit,
        startDate: dateRange ? dateRange[0].format('YYYY-MM-DD') : undefined,
        endDate: dateRange ? dateRange[1].format('YYYY-MM-DD') : undefined,
      })
    },
    [page, limit, dateRange, getProductsReports, setQuery],
  )

  useEffect(() => {
    if (!active) return
    fetchProductsReports()
  }, [page, limit, dateRange, active, fetchProductsReports])

  const onPageChange = (newPage: number, pageSize: number) => {
    setPage(newPage)
    setLimit(pageSize)

    const params = new URLSearchParams(query)
    params.set('page', String(newPage))
    params.set('limit', String(pageSize))
    setQuery(params)
  }

  const onDateChange = (dates: [moment.Moment, moment.Moment] | null) => {
    setDateRange(dates)
    setPage(1)
  }

  return {
    productsReports: result?.data || [],
    productsCount: result?.meta?.count || 0,
    productsSum: result?.meta?.totalSum || 0,
    isProductsLoading: isLoading,
    productsPage: page,
    productsLimit: limit,
    onProductsPageChange: onPageChange,
    onProductsDateChange: onDateChange,
    fetchProductsReports,
  }
}
