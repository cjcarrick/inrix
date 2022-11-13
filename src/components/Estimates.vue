<script setup lang="ts">
defineProps<{ money: number; time: number }>()
</script>

<template>
  <div>
    <p>Estimated Cost</p>
    <h4>{{ money }}</h4>
    <p>Estimated Time</p>
    <h4>{{ time }}</h4>
  </div>
</template>
