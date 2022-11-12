<script setup lang="ts">
import { Suspense } from 'vue'
import TodoItems from '../components/TodoItems.vue'
</script>

<template>
  <h1>Todos</h1>

  <!-- asynchornous data fetching -->
  <Suspense>
    <TodoItems />
  </Suspense>
</template>
