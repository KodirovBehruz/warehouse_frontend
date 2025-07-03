import {FC, useState} from "react";
import {Table} from "antd";
import {ISuppliesReportsTable} from "./interface.ts";
import Column from "antd/es/table/Column";
import {ViewSupplyModal} from "../../molecules/ViewSupplyModal";
import {EyeOutlined} from "@ant-design/icons";


export const SuppliesReportsTable: FC<ISuppliesReportsTable> = ({ data }) => {
    const [viewSupply, setViewSupply] = useState<any>(null)

    return (
        <div>
            <Table
                dataSource={data}
                rowKey="id"
                pagination={false}
            >
                <Column key='createdAt' title='Дата создания' dataIndex='createdAt' align='center' />
                <Column key='supply_code' title='Код поставки' dataIndex='supply_code' align='center' />
                <Column key='supplier' title='Поставщик' render={(record) => record.supplier?.name} align='center' />
                <Column
                    key='products'
                    title='Товар'
                    dataIndex='products'
                    align='center'
                    render={(products) => (
                        <span>
                            {products.map((product: any) => product.name).join(', ')}
                        </span>
                    )}
                />
                <Column key='totalQuantity' title='Общая количества' dataIndex='totalQuantity' align='center' />
                <Column key='totalPrice' title='Сумма' dataIndex='totalPrice' align='center' />
                <Column key='view' title='Просмотр' align='center' render={(record) =>
                    <EyeOutlined
                        style={{ fontSize: "18px", cursor: "pointer", color: "#1890ff" }}
                        onClick={() => setViewSupply(record)}
                    />
                } />
            </Table>
            <ViewSupplyModal
                isOpen={!!viewSupply}
                setIsOpen={() => setViewSupply(null)}
                supply={viewSupply}
            />
        </div>
    )
}