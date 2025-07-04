import { EyeOutlined } from '@ant-design/icons'
import { Button, Space, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { FC, useState } from 'react'
import { useDeleteSupply } from '@hooks/API/Supplies/useDeleteSupply.tsx'
import { useMessage } from '@hooks/useMessages.tsx'
import { UpdateSupplyModal } from '@molecules/UpdateSupplyModal'
import { ViewSupplyModal } from '@molecules/ViewSupplyModal'
import { ISuppliesTable } from './interface.ts'

export const SuppliesTable: FC<ISuppliesTable> = ({ data, onDeleteSuccess, onUpdateSuccess }) => {
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false)
  const [updatingSupply, setUpdatingSupply] = useState<any>(null)
  const [viewSupply, setViewSupply] = useState<any>(null)
  const { error: showError, success: showSuccess } = useMessage()
  const { loading: isLoading, execute: deleteSupply } = useDeleteSupply({
    onSuccess: () => {
      showSuccess('Поставка успешно удалена')
      onDeleteSuccess?.()
    },
    onError: () => showError('Ошибка при удалении поставки'),
  })
  const handleDelete = (id: string) => {
    deleteSupply(id)
  }
  return (
    <div>
      <Table dataSource={data} rowKey="id" pagination={false}>
        <Column key="createdAt" title="Дата создания" dataIndex="createdAt" align="center" />
        <Column key="supply_code" title="Код поставки" dataIndex="supply_code" align="center" />
        <Column
          key="supplier"
          title="Поставщик"
          render={(record) => record.supplier?.name}
          align="center"
        />
        <Column
          key="products"
          title="Товар"
          dataIndex="products"
          align="center"
          render={(products) => (
            <span>{products.map((product: any) => product.name).join(', ')}</span>
          )}
        />
        <Column
          key="totalQuantity"
          title="Общая количества"
          dataIndex="totalQuantity"
          align="center"
        />
        <Column key="totalPrice" title="Сумма" dataIndex="totalPrice" align="center" />
        <Column
          key="actions"
          title="Действия"
          align="center"
          render={(record) => (
            <Space size="middle">
              <Button
                type="primary"
                onClick={() => {
                  setUpdateModalOpen(true)
                  setUpdatingSupply(record)
                }}
              >
                Изменить
              </Button>
              <Button
                style={{ backgroundColor: '#F2c550', color: 'black' }}
                onClick={() => handleDelete(record.id)}
                loading={isLoading}
              >
                Удалить
              </Button>
            </Space>
          )}
        />
        <Column
          key="view"
          title="Просмотр"
          align="center"
          render={(record) => (
            <EyeOutlined
              style={{ fontSize: '18px', cursor: 'pointer', color: '#1890ff' }}
              onClick={() => setViewSupply(record)}
            />
          )}
        />
      </Table>
      <UpdateSupplyModal
        isOpen={updateModalOpen}
        setIsOpen={setUpdateModalOpen}
        supply={updatingSupply}
        onUpdateSuccess={onUpdateSuccess}
      />
      <ViewSupplyModal
        isOpen={!!viewSupply}
        setIsOpen={() => setViewSupply(null)}
        supply={viewSupply}
      />
    </div>
  )
}
