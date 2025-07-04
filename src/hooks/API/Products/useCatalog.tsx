import { useGetProducts } from '@hooks/API/Products/useGetProducts'
import { useMessage } from '@hooks/useMessages'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useCatalog = () => {
  const { error: showError } = useMessage()
  const [query, setQuery] = useSearchParams()
  const [page, setPage] = useState<number>(() => Number(query.get('page')) || 1)
  const [limit, setLimit] = useState<number>(() => Number(query.get('limit')) || 5)

  const {
    result,
    loading: isLoading,
    execute: getProducts,
  } = useGetProducts({
    onError: () => showError('Ошибка при получении товаров'),
  })

  useEffect(() => {
    getProducts({ page, limit })
  }, [getProducts, page, limit])

  const onPageChange = (newPage: number, pageSize: number) => {
    setPage(newPage)
    setLimit(pageSize)

    const params = new URLSearchParams(query)
    params.set('page', String(newPage))
    params.set('limit', String(pageSize))
    setQuery(params)
  }

  return {
    products: result?.data || [],
    total: result?.meta?.count || 0,
    isLoading: isLoading,
    page,
    limit,
    onPageChange,
    getProducts,
  }
}
