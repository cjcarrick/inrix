<script setup lang="ts">
defineProps<{round: number}>()
</script>
<template>
  <div>
    <p>Round Number</p>
    <h4>{{ round }}</h4>
  </div>
</template>
