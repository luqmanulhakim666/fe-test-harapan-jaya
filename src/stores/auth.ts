import { defineStore } from 'pinia'
import { ref } from 'vue'
import Cookies from 'js-cookie'
import type { LoginResponse, LoginPayload } from '@/types/Auth'
import { createHttp } from '@/lib/http'

const BASE_URL = 'https://dummyjson.com'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<LoginResponse | null>(null)
  const token = ref<string | null>(Cookies.get('access_token') || null)
  const refreshToken = ref<string | null>(Cookies.get('refresh_token') || null)
  const initialized = ref(false)
  const loading = ref(false)

  const http = createHttp(BASE_URL)

  const setToken = (access: string, refresh?: string) => {
    token.value = access
    Cookies.set('access_token', access, { expires: 1, path: '/' })
    if (refresh) {
      refreshToken.value = refresh
      Cookies.set('refresh_token', refresh, { expires: 7, path: '/' })
    }
  }

  const clearAuth = () => {
    token.value = null
    refreshToken.value = null
    user.value = null
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
  }

  const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    loading.value = true
    try {
      const res = await http.post<LoginResponse>('/auth/login', payload)
      const data = res.data
      setToken(data.accessToken, data.refreshToken)
      user.value = data
      return data
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    clearAuth()
  }

  const getMe = async () => {
    if (!token.value) {
      initialized.value = true
      return null
    }
    try {
      const res = await http.get<LoginResponse>('/auth/me', {
        headers: { Authorization: `Bearer ${token.value}` }
      })
      user.value = res.data
      return user.value
    } catch {
      clearAuth()
      return null
    } finally {
      initialized.value = true
    }
  }

  return {
    user,
    token,
    refreshToken,
    loading,
    initialized,
    login,
    logout,
    getMe
  }
})
