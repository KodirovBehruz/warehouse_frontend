import { message } from 'antd'
import { createContext, FC, PropsWithChildren, ReactNode, useContext } from 'react'

interface IUseMessage {
  success: (message: ReactNode) => void
  error: (message: ReactNode) => void
  warning: (message: ReactNode) => void
}

const MessagesContext = createContext<IUseMessage>({
  error: () => {},
  success: () => {},
  warning: () => {},
})

export const MessagesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const error = (message: ReactNode): void => {
    messageApi.open({
      type: 'error',
      content: message,
    })
  }
  const success = (message: ReactNode): void => {
    messageApi.open({
      type: 'success',
      content: message,
    })
  }
  const warning = (message: ReactNode): void => {
    messageApi.open({
      type: 'warning',
      content: message,
    })
  }
  return (
    <MessagesContext.Provider value={{ error, success, warning }}>
      {contextHolder}
      {children}
    </MessagesContext.Provider>
  )
}

export const useMessage = (): IUseMessage => {
  const messagesContext = useContext(MessagesContext)

  return messagesContext
}
