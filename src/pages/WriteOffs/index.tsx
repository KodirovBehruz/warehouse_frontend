import { SearchOutlined } from '@ant-design/icons'
import { useWriteOffsList } from '@hooks/API/WriteOffs/useWriteOffsList.tsx'
import { CreateWriteOffModal } from '@molecules/CreateWriteOffModal'
import { WriteOffsTable } from '@organisms/WriteOffsTable'
import { Button, Input, Pagination, Spin } from 'antd'
import { FC, useState } from 'react'
import styles from './index.module.scss'

export const WriteOffs: FC = () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)
  const { writeOffs, isLoading, page, limit, total, onPageChange } = useWriteOffsList()

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <section className={styles.writeOffs}>
      <div className={styles.container}>
        <div className={styles.writeOffs_header}>
          <h1>Список списанных товаров</h1>
          <div className={styles.filters}>
            <Input
              placeholder="Поиск списанных товаров"
              style={{ width: 250 }}
              prefix={<SearchOutlined />}
            />
            <Button type="primary" onClick={() => setCreateModalOpen(true)}>
              Списать товар
            </Button>
          </div>
        </div>
        <CreateWriteOffModal
          isOpen={createModalOpen}
          setIsOpen={setCreateModalOpen}
          onCreateSuccess={() => onPageChange(page, limit)}
        />
        <div className={styles.supplies_table}>
          <WriteOffsTable data={writeOffs} />
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
