import type { User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { supabase } from '@lib/supabaseClient'
import {
	ILoginValues,
	IRegisterValues,
} from '@models/delivery/contracts/IAuthContracts'

export const authStore = create<{
	token: string | null
	userId: string | null
	user?: User | null
	loading: boolean
	login: (
		values: ILoginValues
	) => Promise<{ success: boolean; message: string }>
	register: (
		values: IRegisterValues
	) => Promise<{ success: boolean; message: string }>
	logout: () => Promise<{ success: boolean; message: string }>
}>(set => ({
	token: localStorage.getItem('token') || null,
	userId: localStorage.getItem('userId') || null,
	user: null,
	loading: false,

	login: async values => {
		set({ loading: true })
		try {
			const { email, password } = values
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			})
			if (error) return { success: false, message: error.message }

			const accessToken = data.session?.access_token
			const user = data.user
			if (accessToken) {
				localStorage.setItem('token', accessToken)
			}
			if (user) {
				localStorage.setItem('userId', data.user.id)
			}
			set({ user, token: accessToken, userId: user?.id || null })
			return { success: true, message: 'Вы успешно авторизованы!' }
		} catch (error: unknown) {
			if (error instanceof Error) {
				return { success: false, message: error.message }
			}
			return { success: false, message: 'Ошибка авторизации' }
		} finally {
			set({ loading: false })
		}
	},
	register: async values => {
		set({ loading: true })
		try {
			const { email, password, name, lastName, phoneNumber } = values
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: { data: { name, lastName, phoneNumber } },
			})
			if (error) return { success: false, message: error.message }

			const accessToken = data.session?.access_token
			const user = data.user
			if (accessToken) {
				localStorage.setItem('token', accessToken)
			}
			if (user) {
				localStorage.setItem('userId', user.id)
			}
			set({ user, token: accessToken, userId: user?.id || null })
			return { success: true, message: 'Вы успешно зарегистрированы!' }
		} catch (error: unknown) {
			if (error instanceof Error) {
				return { success: false, message: error.message }
			}
			return { success: false, message: 'Ошибка регистрации' }
		} finally {
			set({ loading: false })
		}
	},
	logout: async () => {
		set({ loading: true })
		try {
			await supabase.auth.signOut()
			localStorage.removeItem('userId')
			localStorage.removeItem('token')
			set({ user: null, token: null, userId: null })
			return { success: true, message: 'Вы успешно вышли из системы!' }
		} catch (error: unknown) {
			if (error instanceof Error) {
				return { success: false, message: error.message }
			}
			return { success: false, message: 'Ошибка выхода' }
		} finally {
			set({ loading: false })
		}
	},
}))
