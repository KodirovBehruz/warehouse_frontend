import {FC, useEffect, useState} from "react";
import styles from "./index.module.scss";
import {Spin, Input, Pagination, DatePicker, Space} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import {SuppliesReportsTable} from "../../components/organisms/SuppliesReportsTable";
import {useSuppliesReportsList} from "../../hooks/API/Reports/useSuppliesList.tsx";
import {useProductsReportsList} from "../../hooks/API/Reports/useProductsList.tsx";
import {ROUTES} from "../../constants/routing.tsx";
import {ProductsReportsTable} from "../../components/organisms/ProductsReportsTable";
import {useLocation} from "react-router-dom";
import {useWriteOffReportsList} from "../../hooks/API/Reports/useWriteOffList.tsx";
import {WriteOffReportsTable} from "../../components/organisms/WriteOffReportsTable";

const PATHS = {
    products: `${ROUTES.REPORTS}/products`,
    supplies: `${ROUTES.REPORTS}/supplies`,
    writeOff: `${ROUTES.REPORTS}/writeOff`,
}

export const Reports: FC = () => {
    const location = useLocation()
    const isProductsActive = location.pathname.includes("/products");
    const isSuppliesActive = location.pathname.includes("/supplies")
    const isWriteOffActive = location.pathname.includes("/writeOff")
    const {
        productsReports,
        isProductsLoading,
        productsPage,
        productsLimit,
        productsCount,
        productsSum,
        onProductsPageChange,
        onProductsDateChange,
        fetchProductsReports,
    } = useProductsReportsList(isProductsActive)
    const {
        suppliesReports,
        isSuppliesLoading,
        suppliesPage,
        suppliesLimit,
        suppliesCount,
        suppliesSum,
        onSuppliesPageChange,
        onSuppliesDateChange,
        fetchSuppliesReports
    } = useSuppliesReportsList(isSuppliesActive);

    const {
        writeOffReports,
        isWriteOffLoading,
        writeOffPage,
        writeOffLimit,
        writeOffCount,
        writeOffSum,
        onWriteOffPageChange,
        onWriteOffDateChange,
        fetchWriteOffReports,
    } = useWriteOffReportsList(isWriteOffActive)

    useEffect(() => {
        if (location.pathname === PATHS.products) {
            fetchProductsReports()
        } else if (location.pathname === PATHS.supplies) {
            fetchSuppliesReports()
        } else if (location.pathname === PATHS.writeOff) {
            fetchWriteOffReports()
        }
    }, [location.pathname]);

    const [selectedDateRange, setSelectedDateRange] = useState<[moment.Moment, moment.Moment] | null>(null)

    if ((isProductsActive && isProductsLoading) || (isSuppliesActive && isSuppliesLoading) || (isWriteOffActive && isWriteOffLoading)) {
        return (
            <div className={styles.loading}>
                <Spin size="large"/>
            </div>
        );
    }

    const renderTable = () => {
        if (isProductsActive) {
            return (
                <ProductsReportsTable
                    data={productsReports}
                />
            )
        } else if (isSuppliesActive) {
            return (
                <SuppliesReportsTable
                    data={suppliesReports}
                />
            )
        } else if (isSuppliesActive) {
            return (
                <SuppliesReportsTable
                    data={suppliesReports}
                />
            )
        } else if (isSuppliesActive) {
            return (
                <WriteOffReportsTable
                    data={writeOffReports}
                />
            )
        }
        return null
    }

    const currentPage = isProductsActive ? productsPage : isSuppliesActive ? suppliesPage : writeOffPage
    const totalCount = isProductsActive ? productsCount : isSuppliesActive ? suppliesCount : writeOffCount
    const totalSum = isProductsActive ? productsSum : isSuppliesActive ? suppliesSum : writeOffSum
    const limit = isProductsActive ? productsLimit : isSuppliesActive ? suppliesLimit : writeOffLimit
    const onPageChange = (page: number, pageSize?: number) => {
        if (isProductsActive) {
            onProductsPageChange(page, pageSize || limit);
        } else if (isSuppliesActive) {
            onSuppliesPageChange(page, pageSize || limit);
        } else if (isWriteOffActive) {
            onWriteOffPageChange(page, pageSize || limit);
        }
    };

    return (
        <section className={styles.supplies}>
            <div className={styles.container}>
                <div className={styles.supplies_header}>
                    <h1>{isProductsActive ? "Остатки товаров на складе" :
                        isSuppliesActive ? "Список поставок" :
                        "Список списанных товаров"}
                    </h1>
                    <div className={styles.filters}>
                        <Space size={12} direction="vertical">
                            <DatePicker.RangePicker
                                value={selectedDateRange}
                                onChange={(dates) => {
                                    setSelectedDateRange(dates)
                                    if (isProductsActive) {
                                        onProductsDateChange(dates);
                                    } else if (isSuppliesActive) {
                                        onSuppliesDateChange(dates);
                                    } else if (isWriteOffActive) {
                                        onWriteOffDateChange(dates);
                                    }
                                }}
                            />
                        </Space>
                        <Input
                            placeholder={isProductsActive ? "Поиск товара" :
                                        isSuppliesActive ? "Поиск поставки" :
                                        "Поиск списанного товара"}
                            style={{width: 250}}
                            prefix={<SearchOutlined/>}
                        />
                    </div>
                </div>
                <div className={styles.totalInfo}>
                    <span>Сумма: {totalSum}$</span>
                </div>
                <div className={styles.supplies_table}>
                    {renderTable()}
                    <Pagination
                        rootClassName={styles.pagination}
                        total={totalCount}
                        pageSize={limit}
                        current={currentPage}
                        onChange={onPageChange}
                    />
                </div>
            </div>
        </section>
    );
};
