import './App.css'
import {AppRouter} from "./router/AppRouter.tsx";
import {MessagesProvider} from "./hooks/useMessages.tsx";
import {DeliveryProvider} from "./hooks/API/useDelivery.tsx";

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
