import {FC, useState} from "react";
import {Button, Space, Table} from "antd";
import {IProductsTable} from "./interface.ts";
import Column from "antd/es/table/Column";
import {useDeleteProduct} from "../../../hooks/API/Products/useDeleteProduct.tsx";
import {useMessage} from "../../../hooks/useMessages.tsx";
import { EyeOutlined } from "@ant-design/icons";
import {UpdateProductModal} from "../../molecules/UpdateProductModal";
import {ViewProductModal} from "../../molecules/ViewProductModal";


export const ProductsTable: FC<IProductsTable> = ({data, onDeleteSuccess, onUpdateSuccess}) => {
    const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false)
    const [updatingProduct, setUpdatingProduct] = useState<any>(null);
    const [viewProduct, setViewProduct] = useState<any>(null)
    const { error: showError, success: showSuccess } = useMessage();
    const { loading: isLoading, execute: deleteProduct } = useDeleteProduct({
        onSuccess: () => {
            showSuccess("Товар успешно удален");
            onDeleteSuccess()
        },
        onError: () => showError("Ошибка при удалении товара"),
    })
    const handleDelete = (id: string) => {
        deleteProduct(id)
    }
    return (
        <div>
            <Table
                dataSource={data}
                rowKey="id"
                pagination={false}
            >
                <Column key='createdAt' title='Дата создания' dataIndex='createdAt' align='center' />
                <Column key='product_code' title='Код товара' dataIndex='product_code' align='center' />
                <Column key='name' title='Название товара' dataIndex='name' align='center' />
                <Column key='unitPrice' title='Цена' dataIndex='unitPrice' align='center' />
                <Column key='quantity' title='Количество' dataIndex='quantity' align='center' />
                <Column key='actions' title='Действия' align='center' render={(record) => (
                    <Space size='middle'>
                        <Button type='primary' onClick={() => {
                            setUpdateModalOpen(true)
                            setUpdatingProduct(record)
                        }}>Изменить</Button>
                        <Button
                            style={{ backgroundColor: "#F2c550", color: "black"}}
                            onClick={() => handleDelete(record.id)}
                            loading={isLoading}
                        >
                            Удалить
                        </Button>
                    </Space>
                )}/>
                <Column key='view' title='Просмотр' align='center' render={(record) =>
                    <EyeOutlined
                        style={{ fontSize: "18px", cursor: "pointer", color: "#1890ff" }}
                        onClick={() => setViewProduct(record)}
                    />
                } />
            </Table>
            <UpdateProductModal
                isOpen={updateModalOpen}
                setIsOpen={setUpdateModalOpen}
                product={updatingProduct}
                onUpdateSuccess={onUpdateSuccess}
            />
            <ViewProductModal
                isOpen={!!viewProduct}
                setIsOpen={() => setViewProduct(null)}
                product={viewProduct}
            />
        </div>
    )
}