<script setup lang="ts">
import StatsList from './StatsList.vue'
defineProps<{ money: number; time: number }>()
</script>

<template>
  <StatsList
    :stats="[
      { key: 'Money', value: money },
      { key: 'Time', value: time }
    ]"
  />
</template>
