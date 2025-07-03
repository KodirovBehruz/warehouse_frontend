import { create } from "zustand";
import axios from "axios";


export const authStore = create((set) => ({
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    loading: false,
    login: async (values) => {
        set({ loading: true });
        try {
            const { data } = await axios.post("/api/auth/login", values);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.id);
            set({ token: data.token, userId: data.id });
            return { success: true, message: "Вы успешно авторизованы!" };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Ошибка авторизации" };
        } finally {
            set({ loading: false });
        }
    },
    register: async (values) => {
        set({ loading: true });
        try {
            const { data } = await axios.post("/api/auth/register", values);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.id);
            set({ token: data.token, userId: data.id });
            return { success: true, message: "Вы успешно зарегистрированы!" };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Ошибка регистрации" };
        } finally {
            set({ loading: false });
        }
    },
    logout: async () => {
        set({ loading: true });
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return { success: false, message: "Токен не найден" };
            }

            const response = await axios.post(
                "/api/auth/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (response.status === 200) {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                set({ token: null, managerId: null });
                return { success: true, message: "Вы успешно вышли из системы!" };
            } else {
                return { success: false, message: "Ошибка выхода" };
            }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Ошибка выхода" };
        } finally {
            set({ loading: false });
        }
    },
}));

