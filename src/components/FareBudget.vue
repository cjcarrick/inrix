<script setup lang="ts">
defineProps<{fare: number}>()
</script>
<template>
  <div>
    <p>Fare Budget</p>
    <h4>{{ fare }}</h4>
  </div>
</template>
