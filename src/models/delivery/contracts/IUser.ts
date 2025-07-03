export interface IAuthResponseContract {
    createdAt: string
    id: string
    name: string
    lastName: string
    email: string
    phoneNumber: string
    password: string
    role: string
    token: string
}

export interface IRegisterContract {
    name: string
    lastName: string
    email: string
    phoneNumber: string
    password: string
    role: string
}

export interface ILoginContract {
    email: string
    password: string
}

