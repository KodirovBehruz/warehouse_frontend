import {FC, useState} from "react";
import styles from "./index.module.scss";
import {Spin, Input, Button, Pagination} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { ProductsTable } from "@components/organisms/ProductsTable";
import { useCatalog } from "@hooks/API/Products/useCatalog.tsx";
import {CreateProductModal} from "@molecules/CreateProductModal";


export const Products: FC = ({onCreateSuccess}) => {
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)
    const {
        products,
        isLoading,
        page,
        limit,
        total,
        onPageChange,
        fetchProducts
    } = useCatalog();

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <Spin size="large"/>
            </div>
        );
    }

    return (
        <section className={styles.products}>
            <div className={styles.container}>
                <div className={styles.products_header}>
                    <h1>Список товаров</h1>
                    <div className={styles.filters}>
                        <Input
                            placeholder="Поиск товаров"
                            style={{width: 250}}
                            prefix={<SearchOutlined/>}
                        />
                        <Button type="primary" onClick={() => setCreateModalOpen(true)}>
                            Создать товар
                        </Button>
                    </div>
                </div>
                <CreateProductModal
                    isOpen={createModalOpen}
                    setIsOpen={setCreateModalOpen}
                    onCreateSuccess={onCreateSuccess}
                />
                <div className={styles.products_table}>
                    <ProductsTable
                        onDeleteSuccess={() => fetchProducts(true)}
                        data={products}
                    />
                    <Pagination
                        rootClassName={styles.pagination}
                        total={total}
                        pageSize={limit}
                        current={page}
                        onChange={onPageChange}
                    />
                </div>
            </div>
        </section>
    );
};
