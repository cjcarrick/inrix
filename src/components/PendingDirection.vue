<script setup lang="ts">
import { Directions } from '../../lib/'
import StatsList from './StatsList.vue'
const props = defineProps<{ directions: Directions }>()
</script>

<template>
  <StatsList
    :stats="[
      { key: 'Type', value: directions.type },
      {
        key: 'From lat',
        value: directions.from.lat
      },
      {
        key: 'From lon',
        value: directions.from.lon
      },
      {
        key: 'To lat',
        value: directions.to.lat
      },
      {
        key: 'To lon',
        value: directions.to.lon
      }
    ]"
  />
</template>
