<template>
  <div>
    <Navbar />
    <main class="p-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
</script>
