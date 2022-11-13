<script setup lang="ts">
defineProps<{bus: Date}>()
</script>
<template>
  <div>
    <p>Time Until Next Bus</p>
    <h4>{{ 15 - bus.getMinutes()%15 }}</h4>
  </div>
</template>
