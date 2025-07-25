import { SearchOutlined } from '@ant-design/icons'
import { useSuppliesList } from '@hooks/API/Supplies/useSuppliesList.tsx'
import { CreateSupplyModal } from '@molecules/CreateSupplyModal'
import { SuppliesTable } from '@organisms/SuppliesTable'
import { Button, Input, Pagination, Spin } from 'antd'
import { FC, useState } from 'react'
import styles from './index.module.scss'

export const Supplies: FC = () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)
  const { supplies, isLoading, page, limit, total, onPageChange, fetchSupplies } = useSuppliesList()

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <section className={styles.supplies}>
      <div className={styles.container}>
        <div className={styles.supplies_header}>
          <h1>Список поставок</h1>
          <div className={styles.filters}>
            <Input
              placeholder="Поиск поставки"
              style={{ width: 250 }}
              prefix={<SearchOutlined />}
            />
            <Button type="primary" onClick={() => setCreateModalOpen(true)}>
              Создать поставку
            </Button>
          </div>
        </div>
        <CreateSupplyModal
          isOpen={createModalOpen}
          setIsOpen={setCreateModalOpen}
          onCreateSuccess={() => fetchSupplies(true)}
        />
        <div className={styles.supplies_table}>
          <SuppliesTable onDeleteSuccess={() => fetchSupplies(true)} data={supplies} />
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
