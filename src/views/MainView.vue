<script setup lang="ts">
import { Directions, TransportTypes, BusData } from 'lib'
import { ref } from 'vue'
import Estimates from '../components/Estimates.vue'
import MapView from '../components/MapContainer.vue'
import TheLoader from '../components/TheLoader.vue'

const pendingDirection = ref<undefined | Directions>(undefined)
const steps = ref<{ directions: Directions; type: TransportTypes }[]>([])

// TODO: Add buses to the map
const buses: BusData[] = await (await fetch('/api/busStations')).json()

const games = ref()
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
    buses.find(
      a => a.lon == directions.from.lon && a.lat == directions.from.lat
    )
  ) {
    return true
  }

  return false
}
</script>

<template>
  <div class="mainGrid">
    <h1 class="logo">RouteFyndr</h1>

    <TheLoader>
      <MapView
        class="map"
        :buses="buses"
        @addPoint="(lat: number, lon: number) => (pendingDirection = {from: { lat: 0.0, lon: 0.0 }, to: {lat: 0, lon: 0}, type: 'walk'})"
      />
    </TheLoader>

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
    </div>

    <Estimates :money="10" :time="14" class="estimates" />
  </div>
</template>

<style lang="scss">
.mainGrid {
  display: grid;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  grid-template-columns: 11em 20em 5em 10em auto;
  grid-template-rows: 5em auto 10em;
  gap: 0.2rem;
}

.logo {
  font-size: 2em;
  grid-row: 1/2;
  grid-column: 1/5;
}

.map {
  grid-row: 2/3;
  grid-column: 1/4;
}
.subPostion {
  grid-row: 3/4;
  grid-column: 1/2;
}
.est {
  grid-row: 3/4;
  grid-column: 3/4;
}
.navTypes {
  grid-row: 3/4;
  grid-column: 2/3;
}
// an unscoped scss is required in App.vue for main.scss to properly load.
// Components don't need this.
// and to be honest i have no idea why

main {
  display: grid;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  grid-template-columns: 10px auto;
  grid-template-rows: 100px auto;
}
</style>
<style lang="scss" scoped>
.nav {
  padding: 1px;
  height: 30%;
}

a {
  font-weight: bold;
  color: #2c3e50;
  height: 10%;
  &.router-link-exact-active {
    color: $green;
  }
}
</style>
