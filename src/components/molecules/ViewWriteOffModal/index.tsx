import {IViewWriteOffModal} from "./interface.ts";
import {FC} from "react";
import {Descriptions, Modal} from "antd";

export const ViewWriteOffModal: FC<IViewWriteOffModal> = ({ isOpen, setIsOpen, writeOff }) => {
    if (!writeOff) return null
    return (
        <Modal title="Просмотр списанного товара"
               open={isOpen}
               onCancel={() => setIsOpen(false)}
               footer={null}
               style={{ marginTop: "7rem" }}
        >
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Менеджер">{writeOff.manager?.name || "-"}</Descriptions.Item>
                <Descriptions.Item label="Дата создания">{writeOff.createdAt}</Descriptions.Item>
                <Descriptions.Item label="Код спианного товара">{writeOff.writeOff_code}</Descriptions.Item>
                <Descriptions.Item label="Общая количества">{writeOff.quantity} шт.</Descriptions.Item>
                <Descriptions.Item label="Причина">{writeOff.reason}</Descriptions.Item>
            </Descriptions>
        </Modal>
    )
}