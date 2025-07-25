import { useDelivery } from '@hooks/API/useDelivery'
import { useFetch } from '@hooks/API/useFetch.tsx'
import { IQueryContract } from '@models/delivery/contracts/IQueryContract'
import { useEffect } from 'react'

export const useGetProductsReports = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) => {
  const delivery = useDelivery()
  const { result, loading, execute } = useFetch({
    asyncFunction: (query: IQueryContract) =>
      delivery.CS.reportsActions.getProductsReportsList(query),
    onSuccess,
    onError,
  })

  useEffect(() => {}, [result])
  return { result, loading, execute }
}
