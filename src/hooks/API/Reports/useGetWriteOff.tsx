import { useDelivery } from '@hooks/API/useDelivery.tsx'
import { useFetch } from '@hooks/API/useFetch'
import { IQueryContract } from '@models/delivery/contracts/IQueryContract'
import { useEffect } from 'react'

export const useGetWriteOffReports = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) => {
  const delivery = useDelivery()
  const { result, loading, execute } = useFetch({
    asyncFunction: (query: IQueryContract) =>
      delivery.CS.reportsActions.getWriteOffReportsList(query),
    onSuccess,
    onError,
  })

  useEffect(() => {}, [result])
  return { result, loading, execute }
}
