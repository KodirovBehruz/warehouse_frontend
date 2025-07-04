import { Form, Input, Modal } from 'antd'
import { FC, useEffect } from 'react'
import { useDelivery } from '@hooks/API/useDelivery.tsx'
import { useFetch } from '@hooks/API/useFetch.tsx'
import { useMessage } from '@hooks/useMessages.tsx'
import { IProductUpdateContract } from '@models/delivery/contracts/IProducts.ts'
import { IUpdateProductModal } from './interface.ts'

export const UpdateProductModal: FC<IUpdateProductModal> = ({ isOpen, setIsOpen, product }) => {
  const delivery = useDelivery()
  const [form] = Form.useForm<IProductUpdateContract>()
  const { error: showError, success: showSuccess } = useMessage()

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product)
    }
  }, [product, form])

  const { execute: updateProduct, loading: isUpdating } = useFetch({
    asyncFunction: delivery.CS.productsActions.updateById,
    onSuccess: () => {
      showSuccess('Товар успешно обновлен')
      form.resetFields()
      setIsOpen(false)
    },
    onError: () => showError('Произошла ошибка при обновлении товара'),
  })

  const submitForm = () => {
    form
      .validateFields()
      .then((values) => {
        updateProduct(product.id, values)
      })
      .catch(() => {
        showError('Заполните все поля')
      })
  }

  return (
    <Modal
      title="Редактировать товар"
      okText="Сохранить"
      centered
      open={isOpen}
      okButtonProps={{ loading: isUpdating }}
      onOk={submitForm}
      onCancel={() => setIsOpen(false)}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Название товара" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Цена" name="unitPrice" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Количество" name="quantity" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
