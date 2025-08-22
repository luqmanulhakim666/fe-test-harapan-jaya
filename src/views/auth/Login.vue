<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-slate-100">
    <v-card class="w-full max-w-sm p-6 rounded-2xl shadow-sm">
      <!-- Form -->
      <v-card-text>
        <v-form ref="loginForm" @submit.prevent="handleLogin">
          <v-text-field
            v-model="username"
            label="Username"
            variant="outlined"
            :error-messages="errors.username"
            required
          />

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            variant="outlined"
            :error-messages="errors.password"
            required
          />

          <v-btn
            :loading="isLoading"
            variant="flat"
            color="primary"
            class="w-full mt-4"
            type="submit"
          >
            Login
          </v-btn>
        </v-form>
      </v-card-text>

      <!-- Footer -->
      <v-card-actions class="justify-center mt-2">
        <small class="text-gray-500">
          Use <strong>username: "emilys"</strong> and
          <strong>password: "emilyspass"</strong> for dummy login.
        </small>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { showToast } from '@/utils/toast'

// Form state with dummy credentials pre-filled
const username = ref('emilys')
const password = ref('emilyspass')
const errors = ref<{ username?: string; password?: string }>({})
const isLoading = ref(false)
const loginForm = ref<any>(null)

// Router & store
const router = useRouter()
const authStore = useAuthStore()

// Yup validation schema
const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
})

// Login function
const handleLogin = async () => {
  errors.value = {}
  try {
    const validated = await schema.validate(
      { username: username.value, password: password.value },
      { abortEarly: false }
    )

    isLoading.value = true
    await authStore.login(validated)

    console.log('login', authStore.login(validated))
    router.push('/')
  } catch (err: any) {
    // Handle validation errors
    if (err.inner) {
      err.inner.forEach((e: any) => {
        if (e.path) {
          ;(errors.value as any)[e.path] = e.message
        }
      })
    } else {
      showToast.error(err.message || 'Login failed')
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
body {
  margin: 0;
}
</style>
