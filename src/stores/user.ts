// stores/user.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User, NewUserPayload } from '@/types/User'
import { createHttp } from '@/lib/http'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const user = ref<User | null>(null)
  const loading = ref(false)

  const api = createHttp('https://jsonplaceholder.typicode.com')

  const fetchUsers = async () => {
    loading.value = true
    try {
      const res = await api.get<User[]>('/users')
      users.value = res.data
    } finally {
      loading.value = false
    }
  }

  const fetchUser = async (id: number) => {
    loading.value = true
    try {
      const local = users.value.find((u) => u.id === id)
      if (local) {
        user.value = { ...local }
        return user.value
      }

      const res = await api.get<User>(`/users/${id}`)
      user.value = res.data
      return res.data
    } finally {
      loading.value = false
    }
  }

  const createUser = async (payload: NewUserPayload) => {
    const res = await api.post<User>('/users', payload)
    users.value.push(res.data)
    return res.data
  }

  const updateUser = async (id: number, payload: NewUserPayload) => {
    const res = await api.put<User>(`/users/${id}`, payload)

    users.value = users.value.map((u) => (u.id === id ? res.data : u))

    if (user.value?.id === id) {
      user.value = { ...res.data }
    }

    return res.data
  }

  const deleteUser = async (id: number) => {
    await api.delete(`/users/${id}`)
    users.value = users.value.filter((u) => u.id !== id)

    if (user.value?.id === id) {
      user.value = null
    }
  }

  return {
    users,
    user,
    loading,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser
  }
})
