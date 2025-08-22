<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center"
  >
    <h1 class="text-9xl font-bold text-blue-600">404</h1>
    <h2 class="mt-4 text-2xl font-semibold text-gray-800">Page Not Found</h2>
    <p class="mt-2 text-gray-600">
      Sorry, the page you are looking for does not exist.
    </p>

    <router-link
      to="/"
      class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
    >
      Back to Home
    </router-link>
  </div>
</template>
