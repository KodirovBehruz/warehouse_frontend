import { DeliveryProvider } from './hooks/API/useDelivery.tsx'
import { MessagesProvider } from './hooks/useMessages.tsx'
import { AppRouter } from './router/AppRouter.tsx'

function App() {
  return (
    <DeliveryProvider>
      <MessagesProvider>
        <AppRouter />
      </MessagesProvider>
    </DeliveryProvider>
  )
}

export default App
