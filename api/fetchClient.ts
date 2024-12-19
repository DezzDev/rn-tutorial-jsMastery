import * as SecureStore from "expo-secure-store"
import { Platform } from "react-native"

// produccion
// const BASE_URL = "https://deploy-java-render-b9f3.onrender.com"
// desarrollo
const BASE_URL = "https://f3chk7w6-8080.uks1.devtunnels.ms"

export interface FetchClientOptions extends RequestInit {
  headers?: Record<string, string>
}

/**
 * Wrapper para fetch con cabeceras por defecto y manejo de errores.
 * @param endpoint - Ruta relativa del endpoint.
 * @param options - Opciones adicionales para fetch.
 * @returns Respuesta parseada como JSON.
 */
export const fetchClient = async (endpoint: string, options: FetchClientOptions = {}) => {
  try {
    let token: string | null = null

    // Recupera el token de SecureStore
    if (Platform.OS === "web") {
      token = localStorage.getItem("token")
    } else {
      token = await SecureStore.getItemAsync("token")
    }

    // cabeceras por defecto
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // if (token) {
    //   defaultHeaders["Authorization"] = `Bearer ${token}`
    // }

    // combina las cabeceras y las opciones proporcionadas
    const config: FetchClientOptions = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers // sobreescribe las cabeceras si es necesario
      }
    }

    // realiza la peticion
    const response = await fetch(`${BASE_URL}/${endpoint}`, config)

    // maneja la respuesta
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error en la solicitud")
    }

    // return json
    return response.json()

  } catch (error) {
    if (error instanceof Error)
      console.error("Error en fetchClient:", error.message)

    throw error
  }
}