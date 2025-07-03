import {FC, useState} from "react";
import {Table} from "antd";
import {IProductsReportsTable} from "./interface.ts";
import Column from "antd/es/table/Column";
import {EyeOutlined} from "@ant-design/icons";
import {ViewProductModal} from "../../molecules/ViewProductModal";


export const ProductsReportsTable: FC<IProductsReportsTable> = ({ data }) => {
    const [viewProduct, setViewProduct] = useState<any>(null)

    return (
        <div>
            <Table
                dataSource={data}
                rowKey="id"
                pagination={false}
            >
                <Column key='createdAt' title='Дата создания' dataIndex='createdAt' align='center'/>
                <Column key='product_code' title='Код товара' dataIndex='product_code' align='center'/>
                <Column key='name' title='Название товара' dataIndex='name' align='center'/>
                <Column key='unitPrice' title='Цена' dataIndex='unitPrice' align='center'/>
                <Column key='quantity' title='Количество' dataIndex='quantity' align='center'/>
                <Column key='view' title='Просмотр' align='center' render={(record) =>
                    <EyeOutlined
                        style={{fontSize: "18px", cursor: "pointer", color: "#1890ff"}}
                        onClick={() => setViewProduct(record)}
                    />
                }/>
            </Table>
            <ViewProductModal
                isOpen={!!viewProduct}
                setIsOpen={() => setViewProduct(null)}
                product={viewProduct}
            />
        </div>
    )
}