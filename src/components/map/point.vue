<script setup lang="ts">
import { Coordinates } from 'lib'

defineProps<{
  strokeWidth: number
  strokeColor: string
  fillColor: string
  radius: number
  points: Coordinates[]
}>()
</script>

<template>
  <ol-vector-layer>
    <ol-source-vector>
      <ol-feature v-for="(a, i) in points" :key="i">
        <ol-geom-point :coordinates="[a.lon, a.lat]"></ol-geom-point>
        <ol-style>
          <ol-style-circle :radius="10">
            <ol-style-fill :color="fillColor"></ol-style-fill>
            <ol-style-stroke
              :color="strokeColor"
              :width="strokeWidth"
            ></ol-style-stroke>
          </ol-style-circle>
        </ol-style>
      </ol-feature>
    </ol-source-vector>
  </ol-vector-layer>
</template>
