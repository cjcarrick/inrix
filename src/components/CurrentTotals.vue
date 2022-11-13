<script setup lang="ts">
defineProps<{ tMoney: number; tTime: number }>()
</script>

<template>
  <div>
    <p>Total Cost</p>
    <h4>{{ tMoney }}</h4>
    <p>Total Time</p>
    <h4>{{ tTime }}</h4>
  </div>
</template>
