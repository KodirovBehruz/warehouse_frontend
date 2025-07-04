import { Button, Form, Input, Modal, Select } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useDelivery } from '@hooks/API/useDelivery.tsx'
import { useFetch } from '@hooks/API/useFetch.tsx'
import { useMessage } from '@hooks/useMessages.tsx'
import { ISupplyUpdateContract } from '@models/delivery/contracts/ISupplies.ts'
import { IUpdateSupplyModal } from './interface.ts'

export const UpdateSupplyModal: FC<IUpdateSupplyModal> = ({ isOpen, setIsOpen, supply }) => {
  const delivery = useDelivery()
  const [form] = Form.useForm<ISupplyUpdateContract>()
  const { error: showError, success: showSuccess } = useMessage()
  const [selectedProducts, setSelectedProducts] = useState<{ id: string; quantity: number }[]>([])

  useEffect(() => {
    if (supply) {
      form.setFieldsValue(supply)
      setSelectedProducts(supply.products || [])
    }
  }, [supply, form])

  const {
    result,
    loading: isProductsLoading,
    execute: getProducts,
  } = useFetch({
    asyncFunction: delivery.CS.productsActions.getList,
    onError: () => showError('Ошибка при получении товаров'),
  })
  const products = result?.data || []

  useEffect(() => {
    if (isOpen) getProducts({})
  }, [isOpen])

  const { execute: updateSupply, loading: isUpdating } = useFetch({
    asyncFunction: delivery.CS.suppliesActions.updateById,
    onSuccess: () => {
      showSuccess('Поставка успешно обновлена')
      form.resetFields()
      setSelectedProducts([])
      setIsOpen(false)
    },
    onError: () => showError('Произошла ошибка при обновлении поставки'),
  })

  const submitForm = () => {
    form
      .validateFields()
      .then((values) => {
        updateSupply(supply.id, { ...values, products: selectedProducts })
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

  return (
    <Modal
      title="Редактировать поставку"
      okText="Сохранить"
      centered
      open={isOpen}
      okButtonProps={{ loading: isUpdating }}
      onOk={submitForm}
      onCancel={() => setIsOpen(false)}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Выберите товар">
          <Select
            loading={isProductsLoading}
            placeholder="выберите товар"
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
