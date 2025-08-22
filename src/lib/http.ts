import axios, { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'

/**
 * Creates a pre-configured Axios instance with optional base URL
 * @param baseURL string - base URL of the API
 */
export const createHttp = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: Cookies.get('access_token')
        ? `Bearer ${Cookies.get('access_token')}`
        : ''
    }
  })

  instance.interceptors.request.use(
    (config) => {
      const token = Cookies.get('access_token')
      if (token) config.headers['Authorization'] = `Bearer ${token}`
      return config
    },
    (error) => Promise.reject(error)
  )

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error)
    }
  )

  return instance
}

export const http = createHttp('https://jsonplaceholder.typicode.com')
