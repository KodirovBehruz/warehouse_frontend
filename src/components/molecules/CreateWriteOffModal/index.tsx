import { Form, Input, Modal, Select } from 'antd'
import { FC, useEffect } from 'react'
import { useDelivery } from '@hooks/API/useDelivery.tsx'
import { useFetch } from '@hooks/API/useFetch.tsx'
import { useMessage } from '@hooks/useMessages.tsx'
import { IWriteOffCreateContract } from '@models/delivery/contracts/IWriteOff.ts'
import { authStore } from '@store/useAuthStore.ts'
import { ICreateWriteOffModal } from './interface.ts'

export const CreateWriteOffModal: FC<ICreateWriteOffModal> = ({
  isOpen,
  setIsOpen,
  onCreateSuccess,
}) => {
  const delivery = useDelivery()
  const [form] = Form.useForm<IWriteOffCreateContract>()
  const { error: showError, success: showSuccess } = useMessage()

  const {
    result,
    loading: isProductsLoading,
    execute: getProducts,
  } = useFetch({
    asyncFunction: delivery.CS.productsActions.getList,
    onError: () => showError('Ошибка при получении товаров'),
  })
  const products = result?.data || []

  const { execute: createWriteOff, loading: isLoading } = useFetch({
    asyncFunction: delivery.CS.writeOffActions.create,
    onSuccess: (response) => {
      showSuccess('Списание товара прошло успешно')
      reset()
      setIsOpen(false)
      response.value?.id && onCreateSuccess?.(response.value.id)
    },
    onError: () => showError('Произошла ошибка при списании товара'),
  })

  useEffect(() => {
    getProducts({})
  }, [])

  const submitForm = () => {
    form
      .validateFields()
      .then((values) => {
        const managerId = authStore.getState().userId
        createWriteOff({ ...values, managerId })
      })
      .catch(() => {
        showError('Заполните все поля')
      })
  }

  const reset = () => {
    form.resetFields()
  }

  return (
    <Modal
      title="Списать товар"
      okText="Списать товар"
      centered
      open={isOpen}
      okButtonProps={{ loading: isLoading }}
      onOk={submitForm}
      onCancel={() => setIsOpen(false)}
    >
      <Form form={form} layout="vertical" onFinish={submitForm}>
        <Form.Item
          label="Выберите товар"
          name="productId"
          rules={[{ required: true, message: 'Выберите товар' }]}
        >
          <Select
            loading={isProductsLoading}
            placeholder="Выберите товар"
            onDropdownVisibleChange={(open) => open && getProducts({})}
          >
            {products.map((product) => (
              <Select.Option key={product.id} value={product.id}>
                {product.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Количество"
          name="quantity"
          rules={[{ required: true, message: 'Введите количество' }]}
        >
          <Input type="number" min={1} />
        </Form.Item>
        <Form.Item
          label="Причина списания"
          name="reason"
          rules={[{ required: true, message: 'Введите причину' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
