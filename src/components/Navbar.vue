<template>
  <header class="bg-white shadow px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <button
        class="md:hidden p-2 rounded hover:bg-gray-100"
        @click="$emit('toggleSidebar')"
      >
        <v-icon>mdi-menu</v-icon>
      </button>
      <h1 class="text-lg font-semibold text-gray-800">{{ pageTitle }}</h1>
    </div>

    <div class="flex items-center gap-4">
      <span class="text-gray-600">
        Hi, {{ user?.firstName || user?.username || 'Guest' }}
      </span>

      <button
        class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
        @click="handleLogout"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePageTitle } from './composables/usePageTitle'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const pageTitle = usePageTitle()

const auth = useAuthStore()
const user = computed(() => auth.user)

const handleLogout = () => {
  auth.logout()
  router.push('/login') // redirect to login after logout
}
</script>
