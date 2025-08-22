<template>
  <aside
    :class="[
      'bg-white shadow-md border-r border-gray-200 flex flex-col fixed md:static inset-y-0 left-0 transform transition-transform duration-300 z-50',
      isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:w-20'
    ]"
  >
    <div
      class="p-4 font-bold text-xl text-blue-600 flex items-center justify-between"
    >
      <span v-if="isOpen || isDesktop">PT. Harapan Jaya</span>
      <button
        class="md:hidden p-2 rounded hover:bg-gray-100"
        @click="toggleSidebar"
      >
        <v-icon>mdi-close</v-icon>
      </button>
    </div>

    <nav class="flex-1 px-2 space-y-2">
      <RouterLink
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600"
        active-class="bg-blue-500 text-white"
      >
        <v-icon>{{ item.icon }}</v-icon>
        <span v-if="isOpen || isDesktop">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['update:isOpen'])

const toggleSidebar = () => {
  emit('update:isOpen', !props.isOpen)
}

const menuItems = ref([
  { to: '/users', label: 'Users', icon: 'mdi-account-group' },
  { to: '/settings', label: 'Settings', icon: 'mdi-cogs' }
])

const isDesktop = ref(window.innerWidth >= 768)

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 768
  if (!isDesktop.value) {
    emit('update:isOpen', false)
  } else {
    emit('update:isOpen', true)
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
