import { EyeOutlined } from "@ant-design/icons";
import { Table } from "antd";
import Column from "antd/es/table/Column";
import { FC, useState } from "react";
import { ViewWriteOffModal } from "../../molecules/ViewWriteOffModal";
import { IWriteOffReportsTable } from "./interface.ts";

export const WriteOffReportsTable: FC<IWriteOffReportsTable> = ({ data }) => {
  const [viewWriteOff, setViewWriteOff] = useState<any>(null);

  return (
    <div>
      <Table dataSource={data} rowKey="id" pagination={false}>
        <Column
          key="createdAt"
          title="Дата создания"
          dataIndex="createdAt"
          align="center"
        />
        <Column
          key="writeOff_code"
          title="Код списанного товара"
          dataIndex="writeOff_code"
          align="center"
        />
        <Column
          key="manager"
          title="Менеджер"
          render={(record) => record.manager?.name}
          align="center"
        />
        <Column
          key="products"
          title="Товар"
          render={(record) => record.products?.map((product) => product?.name)}
          align="center"
        />
        <Column
          key="quantity"
          title="Количество"
          dataIndex="quantity"
          align="center"
        />
        <Column
          key="reason"
          title="Причина списания"
          dataIndex="reason"
          align="center"
        />
        <Column
          key="view"
          title="Просмотр"
          align="center"
          render={(record) => (
            <EyeOutlined
              style={{ fontSize: "18px", cursor: "pointer", color: "#1890ff" }}
              onClick={() => setViewWriteOff(record)}
            />
          )}
        />
      </Table>
      <ViewWriteOffModal
        isOpen={!!viewWriteOff}
        setIsOpen={() => setViewWriteOff(null)}
        writeOff={viewWriteOff}
      />
    </div>
  );
};
