import { SearchOutlined } from '@ant-design/icons'
import { ProductsReportsTable } from '@components/organisms/ProductsReportsTable'
import { WriteOffReportsTable } from '@components/organisms/WriteOffReportsTable'
import { ROUTES } from '@constants/routing.tsx'
import { useProductsReportsList } from '@hooks/API/Reports/useProductsList.tsx'
import { useSuppliesReportsList } from '@hooks/API/Reports/useSuppliesList.tsx'
import { useWriteOffReportsList } from '@hooks/API/Reports/useWriteOffList.tsx'
import { SuppliesReportsTable } from '@organisms/SuppliesReportsTable'
import { DatePicker, Input, Pagination, Space, Spin } from 'antd'
import { Dayjs } from 'dayjs'
import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './index.module.scss'

const PATHS = {
  products: `${ROUTES.REPORTS}/products`,
  supplies: `${ROUTES.REPORTS}/supplies`,
  writeOff: `${ROUTES.REPORTS}/writeOff`,
}

export const Reports: FC = () => {
  const location = useLocation()
  const isProductsActive = location.pathname.includes('/products')
  const isSuppliesActive = location.pathname.includes('/supplies')
  const isWriteOffActive = location.pathname.includes('/writeOff')
  const {
    productsReports,
    isProductsLoading,
    productsPage,
    productsLimit,
    productsCount,
    productsSum,
    onProductsPageChange,
    onProductsDateChange,
    fetchProductsReports,
  } = useProductsReportsList(isProductsActive)
  const {
    suppliesReports,
    isSuppliesLoading,
    suppliesPage,
    suppliesLimit,
    suppliesCount,
    suppliesSum,
    onSuppliesPageChange,
    onSuppliesDateChange,
    fetchSuppliesReports,
  } = useSuppliesReportsList(isSuppliesActive)

  const {
    writeOffReports,
    isWriteOffLoading,
    writeOffPage,
    writeOffLimit,
    writeOffCount,
    writeOffSum,
    onWriteOffPageChange,
    onWriteOffDateChange,
    fetchWriteOffReports,
  } = useWriteOffReportsList(isWriteOffActive)

  useEffect(() => {
    if (location.pathname === PATHS.products) {
      fetchProductsReports()
    } else if (location.pathname === PATHS.supplies) {
      fetchSuppliesReports()
    } else if (location.pathname === PATHS.writeOff) {
      fetchWriteOffReports()
    }
  }, [location.pathname, fetchProductsReports, fetchSuppliesReports, fetchWriteOffReports])

  const [selectedDateRange, setSelectedDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(
    null,
  )

  if (
    (isProductsActive && isProductsLoading) ||
    (isSuppliesActive && isSuppliesLoading) ||
    (isWriteOffActive && isWriteOffLoading)
  ) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    )
  }

  const renderTable = () => {
    if (isProductsActive) {
      return <ProductsReportsTable data={productsReports} />
    } else if (isSuppliesActive) {
      return <SuppliesReportsTable data={suppliesReports} />
    } else if (isWriteOffActive) {
      return <WriteOffReportsTable data={writeOffReports} />
    }
    return null
  }

  const currentPage = isProductsActive
    ? productsPage
    : isSuppliesActive
      ? suppliesPage
      : writeOffPage
  const totalCount = isProductsActive
    ? productsCount
    : isSuppliesActive
      ? suppliesCount
      : writeOffCount
  const totalSum = isProductsActive ? productsSum : isSuppliesActive ? suppliesSum : writeOffSum
  const limit = isProductsActive ? productsLimit : isSuppliesActive ? suppliesLimit : writeOffLimit
  const onPageChange = (page: number, pageSize?: number) => {
    if (isProductsActive) {
      onProductsPageChange(page, pageSize || limit)
    } else if (isSuppliesActive) {
      onSuppliesPageChange(page, pageSize || limit)
    } else if (isWriteOffActive) {
      onWriteOffPageChange(page, pageSize || limit)
    }
  }

  return (
    <section className={styles.supplies}>
      <div className={styles.container}>
        <div className={styles.supplies_header}>
          <h1>
            {isProductsActive
              ? 'Остатки товаров на складе'
              : isSuppliesActive
                ? 'Список поставок'
                : 'Список списанных товаров'}
          </h1>
          <div className={styles.filters}>
            <Space size={12} direction="vertical">
              <DatePicker.RangePicker
                value={selectedDateRange}
                onChange={(dates) => {
                  setSelectedDateRange(dates)
                  if (isProductsActive) {
                    onProductsDateChange(dates)
                  } else if (isSuppliesActive) {
                    onSuppliesDateChange(dates)
                  } else if (isWriteOffActive) {
                    onWriteOffDateChange(dates)
                  }
                }}
              />
            </Space>
            <Input
              placeholder={
                isProductsActive
                  ? 'Поиск товара'
                  : isSuppliesActive
                    ? 'Поиск поставки'
                    : 'Поиск списанного товара'
              }
              style={{ width: 250 }}
              prefix={<SearchOutlined />}
            />
          </div>
        </div>
        <div className={styles.totalInfo}>
          <span>Сумма: {totalSum}$</span>
        </div>
        <div className={styles.supplies_table}>
          {renderTable()}
          <Pagination
            rootClassName={styles.pagination}
            total={totalCount}
            pageSize={limit}
            current={currentPage}
            onChange={onPageChange}
          />
        </div>
      </div>
    </section>
  )
}
