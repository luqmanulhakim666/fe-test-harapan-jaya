<template>
  <div class="loading">
    <v-progress-circular
      width="5"
      class="loading-circle"
      color="primary"
      size="60"
      indeterminate
    />
  </div>
</template>

<script>
export default {
  name: 'GeneralLoading'
}
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .loading-circle {
    position: relative;
  }
}
</style>
