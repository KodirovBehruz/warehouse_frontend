import {Button, Card} from "antd";
import {authStore} from "../../store/useAuthStore.ts";
import styles from "./index.module.scss"


export const Home = () => {
    const store = authStore()
    return (
        <Card title="Вы успешно авторизированы" className={styles.container}>
            <Button size='large' onClick={store.logout}>Выйти</Button>
        </Card>
    )
}