import { createContext, useContext, useState, useEffect, Children } from "react"
import { Platform } from "react-native"
import * as SecureStore from "expo-secure-store"
import { signIn } from "@/api/auth";

interface AuthContextProps {
  isLoggedIn: boolean;
  token: string | null;
  isLoading: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setToken: (value: string | null) => void;
  setIsLoading: (value: boolean) => void;
  login: (data: UserFormData) => Promise<void>;
  logout: () => Promise<void>;
}

interface UserFormData {
  email: string
  password: string
}

interface PostResponse {
  message: string
  status: string
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // this run when the application start
  useEffect(() => {
   
    const loadToken = async () => {
      try {

        let token: string | null = null
        if(Platform.OS === "web") {
          token = localStorage.getItem("token")
        }else{        
          token = await SecureStore.getItemAsync("token")        
        }
        console.log("stored token", token)
        setToken(token)
        setIsLoggedIn(true)
      } catch (error) {
        setIsLoggedIn(false)
        console.log("Error loading token", error)
        throw error
      } finally {
        setIsLoading(false)
      }
    }
    loadToken()
  }, [])

  const login = async ({ email, password }: UserFormData) => {
    try {
      const token:string = await signIn({ email, password }).then(data => data.message)
      console.log("login token", token)

      if(!token){
        throw new Error("Invalid token")
      }

      if(Platform.OS === "web") {
        localStorage.setItem("token",token)
      }else{        
        await SecureStore.setItemAsync("token", token, { 
          keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY })
      }

      setToken(token)
      setIsLoggedIn(true)
      
    } catch (error) {
      setIsLoggedIn(false)
      console.error(error)
      throw error
    }
  }

  const logout = async () => {
    try {
      if(Platform.OS === "web") {
        localStorage.removeItem("token")
      }else{        
        await SecureStore.deleteItemAsync("token")        
      }
      setToken(null)
      setIsLoggedIn(false)
    } catch (error) {
      console.log("Error logging out", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      token,
      isLoading,
      setIsLoggedIn,
      setToken,
      setIsLoading,
      login,
      logout,
    }} >
      {children}
    </AuthContext.Provider>
  )
}
