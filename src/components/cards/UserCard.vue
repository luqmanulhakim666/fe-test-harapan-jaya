<template>
  <div
    class="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
  >
    <div class="flex items-center space-x-4 mb-4">
      <div
        class="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-lg shadow"
      >
        {{ user.name.charAt(0).toUpperCase() }}
      </div>
      <h2
        class="text-xl font-semibold text-gray-800 truncate max-w-[160px] sm:max-w-[300px]"
      >
        {{ user.name }}
      </h2>
    </div>

    <div class="space-y-2 text-gray-600">
      <p class="flex items-center">
        <span class="mr-2">
          <v-icon size="20">mdi-email-outline</v-icon>
        </span>
        {{ user.email }}
      </p>
      <p class="flex items-center">
        <span class="mr-2">
          <v-icon size="20">mdi-phone-outline</v-icon>
        </span>
        {{ user.phone }}
      </p>
      <p class="flex items-center">
        <span class="mr-2">
          <v-icon size="20">mdi-map-marker-outline</v-icon>
        </span>
        {{ user.address.city }}
      </p>
    </div>

    <div v-if="$slots.actions" class="mt-4">
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

interface User {
  id: number
  name: string
  email: string
  phone: string
  address: {
    city: string
  }
}

defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  }
})
</script>
