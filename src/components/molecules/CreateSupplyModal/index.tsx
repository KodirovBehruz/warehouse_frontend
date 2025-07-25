import { Button, Form, Input, Modal, Select } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useDelivery } from '@hooks/API/useDelivery.tsx'
import { useFetch } from '@hooks/API/useFetch.tsx'
import { useMessage } from '@hooks/useMessages.tsx'
import { ISupplyCreateContract } from '@models/delivery/contracts/ISupplies.ts'
import { authStore } from '@store/useAuthStore.ts'
import { ICreateSupplyModal } from './interface.ts'

export const CreateSupplyModal: FC<ICreateSupplyModal> = ({
  isOpen,
  setIsOpen,
  onCreateSuccess,
}) => {
  const delivery = useDelivery()
  const [form] = Form.useForm<ISupplyCreateContract>()
  const { error: showError, success: showSuccess } = useMessage()
  const [selectedProducts, setSelectedProducts] = useState<{ id: string; quantity: number }[]>([])

  const {
    result,
    loading: isProductsLoading,
    execute: getProducts,
  } = useFetch({
    asyncFunction: delivery.CS.productsActions.getList,
    onError: () => showError('Ошибка при получении товаров'),
  })
  const products = result?.data || []

  const { execute: createSupply, loading: isSupplyLoading } = useFetch({
    asyncFunction: delivery.CS.suppliesActions.create,
    onSuccess: (response) => {
      showSuccess('Поставка успешно создана')
      reset()
      setIsOpen(false)
      response.value?.id && onCreateSuccess?.(response.value.id)
    },
    onError: () => showError('Произошла ошибка при создании поставки'),
  })

  useEffect(() => {
    getProducts({})
  }, [])

  const submitForm = () => {
    if (selectedProducts.length === 0) {
      return showError('Выберите хотя бы один товар.')
    }

    form
      .validateFields()
      .then((values) => {
        const supplierId = authStore.getState().userId
        createSupply({ ...values, supplierId, products: selectedProducts })
      })
      .catch(() => {
        showError('Заполните все поля')
      })
  }

  const addProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.some((p) => p.id === id) ? prev : [...prev, { id, quantity: 1 }],
    )
  }

  const updateQuantity = (id: string, quantity: number) => {
    setSelectedProducts((prev) => prev.map((p) => (p.id === id ? { ...p, quantity } : p)))
  }

  const removeProduct = (id: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const reset = () => {
    form.resetFields()
    setSelectedProducts([])
  }

  return (
    <Modal
      title="Создать поставку"
      okText="Создать"
      centered
      open={isOpen}
      okButtonProps={{ loading: isSupplyLoading }}
      onOk={() => submitForm()}
      onCancel={() => setIsOpen(false)}
    >
      <Form form={form} layout="vertical" onFinish={submitForm}>
        <Form.Item label="Выберите товар">
          <Select
            loading={isProductsLoading}
            placeholder="Выберите товар"
            onSelect={addProduct}
            onDropdownVisibleChange={(open) => open && getProducts({})}
          >
            {products.map((product) => (
              <Select.Option key={product.id} value={product.id}>
                {product.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {selectedProducts.map(({ id, quantity }) => (
          <Form.Item
            key={id}
            label={`Количество для ${products.find((p) => p.id === id)?.name || ''}`}
          >
            <Input
              type="number"
              value={quantity}
              onChange={(e) => updateQuantity(id, Number(e.target.value))}
              min={1}
            />
            <Button type="link" danger onClick={() => removeProduct(id)}>
              Удалить
            </Button>
          </Form.Item>
        ))}
      </Form>
    </Modal>
  )
}
