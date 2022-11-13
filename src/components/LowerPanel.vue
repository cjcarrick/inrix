<script setup lang="ts">
import { ref } from 'vue'
import type { BusData, Directions, TransportTypes } from '../../lib'

// TODO: use the Game class from backend/game.ts
const props = defineProps<{
  game: Game
  buses: BusData[]
}>()

const pendingDirection = ref<undefined | Directions>(undefined)
const steps = ref<{ directions: Directions; type: TransportTypes }[]>([])

const addDirection = (type: TransportTypes) => {
  if (pendingDirection.value) {
    steps.value.push({
      type,
      directions: pendingDirection.value
    })
  } else {
    console.warn('Pening direction is undefined')
  }
}

const busAvalible = (directions: Directions) => {
  if (
    props.buses.find(
      a =>
        a.lon == game.directions.from.lon && a.lat == game.directions.from.lat
    )
  ) {
    return true
  }

  return false
}
</script>

<template>
  <div class="controls">
    <div class="navTypes">
      <button :disabled="!!pendingDirection" @click="() => addDirection('bus')">
        Rideshare
      </button>
      <button :disabled="!!pendingDirection" @click="() => addDirection('bus')">
        Bus
      </button>
      <button
        :disabled="!!pendingDirection && busAvalible(pendingDirection)"
        @click="() => addDirection('walk')"
      >
        Walk
      </button>

      <button
        class="submit"
        :disabled="
          steps[steps.length - 1].directions.to.lat !== to.lat &&
          steps[steps.length - 1].directions.to.lon !== to.lon
        "
      >
        Submit
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navTypes {
  display: flex;
  flex-direction: column;
}
</style>
