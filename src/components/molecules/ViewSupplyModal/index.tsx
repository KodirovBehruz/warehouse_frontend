import { Descriptions, Modal } from 'antd'
import { FC } from 'react'
import { IViewSupplyModal } from './interface.ts'

export const ViewSupplyModal: FC<IViewSupplyModal> = ({ isOpen, setIsOpen, supply }) => {
  if (!supply) return null
  return (
    <Modal
      title="Просмотр поставки"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
      style={{ marginTop: '7rem' }}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Поставщик">{supply.supplier?.name || '-'}</Descriptions.Item>
        <Descriptions.Item label="Дата создания">{supply.createdAt}</Descriptions.Item>
        <Descriptions.Item label="Код поставки">{supply.supply_code}</Descriptions.Item>
        <Descriptions.Item label="Общая количества">{supply.totalQuantity} шт.</Descriptions.Item>
        <Descriptions.Item label="Сумма">{supply.totalPrice} ₽</Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}