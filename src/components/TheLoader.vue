<script lang="ts" setup>
import { Suspense } from 'vue'
</script>

<template>
  <Suspense timeout="0">
    <template #default>
      <slot>Missing Content.</slot>
    </template>

    <template #fallback>
      <div class="loader">
        <span>Loading...</span>
      </div>
    </template>
  </Suspense>
</template>

<style lang="scss" scoped>
.loader {
  min-height: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
