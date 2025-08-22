<template>
  <div class="flex min-h-screen bg-slate-100">
    <Sidebar v-model:isOpen="isSidebarOpen" />
    <div class="flex-1 flex flex-col transition-all duration-300">
      <Navbar @toggleSidebar="isSidebarOpen = !isSidebarOpen" />
      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'

const isSidebarOpen = ref(true)
</script>
