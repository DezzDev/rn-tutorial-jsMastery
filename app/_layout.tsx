import { AuthProvider } from "@/context/AuthProvider"
import AppNavigator from "./AppNavigator"

const RootLayout = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  )
 
}

export default RootLayout
