<script setup lang="ts">
defineProps<{current: Date}>()
</script>
<template>
  <div>
    <p>Current Time</p>
    <h4>{{ current.getHours() > 12 ? current.getHours()  : current.getHours() + 12 }}:{{ current.getMinutes() }}{{ current.getHours() < 12 ? ' am' : ' pm' }}</h4>
  </div>
</template>
