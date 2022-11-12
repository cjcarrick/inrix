<script setup lang="ts">
import { Suspense } from 'vue'
import { useRoute } from 'vue-router'
import TodoItems from '../components/TodoItems.vue'

const params = useRoute().params
const id = parseInt(params.id.toString())
</script>

<template>
  <h1>Todos</h1>

  <!-- asynchornous data fetching -->
  <Suspense>
    <TodoItems :id="id" />
  </Suspense>
</template>
