<template>
  <v-dialog
    v-model="show"
    max-width="420"
    transition="dialog-bottom-transition"
    persistent
  >
    <v-card class="rounded-xl shadow-lg">
      <v-card-title
        class="text-h6 text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600"
      >
        {{ title || 'Confirm Action' }}
      </v-card-title>

      <v-card-text class="py-6">
        <div class="flex items-center justify-between gap-3">
          <span class="text-gray-700 text-base leading-relaxed">
            {{ message || 'Are you sure you want to continue?' }}
          </span>
        </div>
      </v-card-text>

      <v-card-actions class="justify-end bg-gray-50 rounded-b-xl px-4 py-3">
        <v-btn
          variant="tonal"
          color="red-darken-2"
          :disabled="loading"
          class="px-4"
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn color="indigo" :loading="loading" class="px-4" @click="confirm">
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title?: string
  message?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', done: () => void): void
}>()

const show = ref(props.modelValue)
const loading = ref(false)

watch(
  () => props.modelValue,
  (val) => (show.value = val)
)

const confirm = () => {
  loading.value = true
  emit('confirm', () => {
    loading.value = false
    emit('update:modelValue', false)
  })
}

const cancel = () => {
  if (!loading.value) {
    emit('update:modelValue', false)
  }
}
</script>
