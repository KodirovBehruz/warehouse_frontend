import { FC } from "react";
import { ICreateProductModal } from "./interface.ts";
import { Form, Input, Modal } from "antd";
import { useMessage } from "../../../hooks/useMessages.tsx";
import { IProductCreateContract } from "../../../models/delivery/contracts/IProducts.ts";
import { useDelivery } from "../../../hooks/API/useDelivery.tsx";
import { useFetch } from "../../../hooks/API/useFetch.tsx";
import {authStore} from "../../../store/useAuthStore.ts";


export const CreateProductModal: FC<ICreateProductModal> = ({ isOpen, setIsOpen, onCreateSuccess }) => {
    const delivery = useDelivery();
    const [form] = Form.useForm<IProductCreateContract>();
    const { error: showError, success: showSuccess } = useMessage();

    const { execute: createProduct, loading: isProductLoading } = useFetch({
        asyncFunction: delivery.CS.productsActions.create,
        onSuccess: (response) => {
            showSuccess("Товар успешно создан");
            form.resetFields();
            setIsOpen(false);
            response.value?.id && onCreateSuccess?.(response.value.id);
        },
        onError: () => showError('Произошла ошибка при создании товара'),
    });

    const submitForm = () => {
        form.validateFields().then((values) => {
            const managerId = authStore.getState().userId
            createProduct({ ...values, managerId });
        })
            .catch(() => {
                showError('Заполните все поля');
            });
    };

    return (
        <Modal
            title='Создать товар'
            okText='Создать'
            centered
            open={isOpen}
            okButtonProps={{ loading: isProductLoading }}
            onOk={() => submitForm}
            onCancel={() => setIsOpen(false)}
        >
            <Form
                form={form}
                layout='vertical'
                onFinish={submitForm}>
                <Form.Item label='Название товара' name='name'>
                    <Input />
                </Form.Item>
                <Form.Item label='Цена' name='unitPrice'>
                    <Input />
                </Form.Item>
                <Form.Item label='Количество' name='quantity'>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
