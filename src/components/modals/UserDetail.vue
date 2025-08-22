<template>
  <v-dialog v-model="internalShow" max-width="500" persistent>
    <v-card class="rounded-xl overflow-hidden shadow-lg">
      <v-card-title
        class="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
      >
        <div class="d-flex align-center justify-space-between w-100">
          <span class="text-h6 font-bold">{{ user?.name }}</span>
          <v-btn variant="text" @click="close" class="text-white">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>

      <v-card-text class="space-y-4 px-6 py-4 bg-gray-50">
        <div class="flex items-center gap-3">
          <v-icon class="text-purple-500">mdi-account</v-icon>
          <div>
            <span class="text-gray-500 text-sm">Username</span>
            <div class="font-medium text-gray-700">
              {{ user?.username || 'N/A' }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <v-icon class="text-blue-500">mdi-email</v-icon>
          <div>
            <span class="text-gray-500 text-sm">Email</span>
            <div class="font-medium text-gray-700 break-all">
              {{ user?.email || 'N/A' }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <v-icon class="text-green-500">mdi-phone</v-icon>
          <div>
            <span class="text-gray-500 text-sm">Phone</span>
            <div class="font-medium text-gray-700">
              {{ user?.phone || 'N/A' }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <v-icon class="text-red-500">mdi-map-marker</v-icon>
          <div>
            <span class="text-gray-500 text-sm">City</span>
            <div class="font-medium text-gray-700">
              {{ user?.address?.city || 'N/A' }}
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { User } from '@/types/User'

const props = defineProps<{
  modelValue: boolean
  user: User | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const internalShow = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => (internalShow.value = val)
)
watch(internalShow, (val) => emit('update:modelValue', val))

const close = () => (internalShow.value = false)
</script>

<style scoped>
.v-card-text div {
  word-break: break-word;
}
</style>
