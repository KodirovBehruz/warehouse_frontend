import { Descriptions, Modal } from 'antd'
import { FC } from 'react'
import { IViewProductModal } from './interface.ts'

export const ViewProductModal: FC<IViewProductModal> = ({ isOpen, setIsOpen, product }) => {
  if (!product) return null
  return (
    <Modal
      title="Просмотр товара"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
      style={{ marginTop: '7rem' }}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Менеджер">{product.manager?.name || '-'}</Descriptions.Item>
        <Descriptions.Item label="Дата создания">{product.createdAt}</Descriptions.Item>
        <Descriptions.Item label="Код товара">{product.product_code}</Descriptions.Item>
        <Descriptions.Item label="Название">{product.name}</Descriptions.Item>
        <Descriptions.Item label="Количество">{product.quantity} шт.</Descriptions.Item>
        <Descriptions.Item label="Цена">{product.unitPrice} ₽</Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}