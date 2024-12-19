import { fetchClient } from "./fetchClient"

interface UserFormData {
  email: string
  password: string
}

interface PostResponse {
  message: string
  status: string
}


/**
 * Create an user on database 
 * @param formData object with email and password
 * @returns object {message: string, status: string}
 */
export const createUser = async ({ email, password }: UserFormData) => {

  const emailLowerCase = email.toLowerCase()

  return fetchClient("auth/register", {
    method: "POST",
    body: JSON.stringify({
      email: emailLowerCase,
      password: password
    })
  })
}

/**
 * Function to sign in into the app
 * @param formData object with email and password
 * @returns object {message: string, status: string}
 */

export const signIn = async ({ email, password }: UserFormData) => {
  const emailLowerCase = email.toLowerCase()

  return fetchClient("auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: emailLowerCase,
      password: password,
    }),
  })


}








