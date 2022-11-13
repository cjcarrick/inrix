<script setup lang="ts">
import StatsList from './StatsList.vue'
defineProps<{ money: number; time: number }>()
</script>

<template>
  <div  class = "displayEsts">
  <StatsList
    :stats="[
      { key: 'Money', value: money },
      { key: 'Time', value: time }
    ]"
 />
 </div>
</template>
<style>
.displayEsts{
  display: flex;
  flex-direction: row;
}

</style>