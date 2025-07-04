import { SearchOutlined } from '@ant-design/icons'
import { ProductsTable } from '@components/organisms/ProductsTable'
import { useCatalog } from '@hooks/API/Products/useCatalog.tsx'
import { CreateProductModal } from '@molecules/CreateProductModal'
import { Button, Input, Pagination, Spin } from 'antd'
import { FC, useState } from 'react'
import styles from './index.module.scss'

export const Products: FC = () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)
  const { products, isLoading, page, limit, total, onPageChange, getProducts } = useCatalog()

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <section className={styles.products}>
      <div className={styles.container}>
        <div className={styles.products_header}>
          <h1>Список товаров</h1>
          <div className={styles.filters}>
            <Input placeholder="Поиск товаров" style={{ width: 250 }} prefix={<SearchOutlined />} />
            <Button type="primary" onClick={() => setCreateModalOpen(true)}>
              Создать товар
            </Button>
          </div>
        </div>
        <CreateProductModal
          isOpen={createModalOpen}
          setIsOpen={setCreateModalOpen}
          onCreateSuccess={() => getProducts(true)}
        />
        <div className={styles.products_table}>
          <ProductsTable onDeleteSuccess={() => getProducts()} data={products} />
          <Pagination
            rootClassName={styles.pagination}
            total={total}
            pageSize={limit}
            current={page}
            onChange={onPageChange}
          />
        </div>
      </div>
    </section>
  )
}
