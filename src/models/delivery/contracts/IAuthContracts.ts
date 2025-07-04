export interface IAuthResponseContract {
  accessToken: string
  refreshToken: string
}

export interface ILoginValues {
  email: string
  password: string
}

export interface IRegisterValues extends ILoginValues {
  name: string
  lastName: string
  phoneNumber: string
}
