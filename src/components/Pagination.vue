<template>
  <div
    class="flex flex-wrap justify-center items-center gap-2 mt-6 px-2 text-sm sm:text-base"
  >
    <v-btn
      :disabled="currentPage === 1"
      @click="$emit('update:page', currentPage - 1)"
      color="primary"
      variant="outlined"
      rounded="lg"
      class="min-w-[70px] sm:min-w-[90px]"
    >
      <v-icon>mdi-chevron-left</v-icon> Prev
    </v-btn>

    <span class="block sm:hidden text-gray-600 font-medium px-2">
      {{ currentPage }} / {{ totalPages }}
    </span>

    <div class="hidden sm:flex items-center gap-1 flex-wrap">
      <v-btn
        v-for="page in totalPages"
        :key="page"
        size="small"
        rounded="lg"
        class="min-w-[36px]"
        :color="page === currentPage ? 'primary' : 'grey'"
        :variant="page === currentPage ? 'elevated' : 'text'"
        @click="$emit('update:page', page)"
      >
        {{ page }}
      </v-btn>
    </div>

    <v-btn
      :disabled="currentPage === totalPages"
      @click="$emit('update:page', currentPage + 1)"
      color="primary"
      variant="outlined"
      rounded="lg"
      class="min-w-[70px] sm:min-w-[90px]"
    >
      Next <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{
  currentPage: number
  totalPages: number
}>()
</script>
