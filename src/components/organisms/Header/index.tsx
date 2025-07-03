import styles from "./index.module.scss";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../constants/routing.tsx";
import {Dropdown} from "antd";
import { DownOutlined } from "@ant-design/icons";

const menuItems = [
    {
        key: 1,
        label: <NavLink to={ROUTES.REPORTS.PRODUCTS}>Товары</NavLink>
    },
    {
        key: 2,
        label: <NavLink to={ROUTES.REPORTS.SUPPLIES}>Поставки</NavLink>
    },
    {
        key: 3,
        label: <NavLink to={ROUTES.REPORTS.WRITEOFF}>Списанные товары</NavLink>
    }
]


export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <nav className={styles.menu}>
                    <NavLink to={ROUTES.INDEX} className={({ isActive }) => isActive ? styles.active : ""}>
                        Главная
                    </NavLink>

                    <NavLink to={ROUTES.PRODUCTS} className={({ isActive }) => isActive ? styles.active : ""}>
                        Товары
                    </NavLink>

                    <NavLink to={ROUTES.SUPPLIES} className={({ isActive }) => isActive ? styles.active : ""}>
                        Поставки
                    </NavLink>

                    <NavLink to={ROUTES.WRITEOFF} className={({ isActive }) => isActive ? styles.active : ""}>
                        Списанные товары
                    </NavLink>

                    <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                        <span className={styles.menuItems}>
                            Отчеты <DownOutlined />
                        </span>
                    </Dropdown>
                </nav>
            </div>
        </header>
    );
};
