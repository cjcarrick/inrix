<script setup lang="ts">
import {
  BusData,
  Coordinates,
  Directions,
  NewGameData,
  RideShareData
} from 'lib'
import qs from 'qs'
import { ref } from 'vue'
import Estimates from '../components/Estimates.vue'
import MapView from '../components/MapTwo.vue'
import PendingDirection from '../components/PendingDirection.vue'
import TheLoader from '../components/TheLoader.vue'

const instruction = ref('Pick where to go next.')

// TODO: Add buses to the map
const buses: BusData[] = await (await fetch('/api/busStations')).json()

const game: NewGameData = await (await fetch('/api/newGame')).json()

const moves = ref<Directions[]>([])
const pendingMove = ref<undefined | Directions>(undefined)

const rideShares = ref<RideShareData[]>([])
const getRideShares = async (from: Coordinates, to: Coordinates) => {
  const req = await fetch('/api/rideshares?' + qs.stringify({ from, to }))
  const json: RideShareData[] = await req.json()
  rideShares.value = json
}
// Get rideshares for the starting position
getRideShares(game.from)

const gnames = ref()
const addDirection = () => {
  if (pendingMove.value) {
    moves.value.push(pendingMove.value)
  } else {
    console.warn('Pending direction is undefined')
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
    <h1 class="logo">RouteRacer</h1>

    <TheLoader>
      <MapView
        class="map"
        :buses="buses"
        :rideshares="rideshares"
        :from="game.from"
        :to="game.to"
        :ride-shares="rideShares"
        @setActive="(move: Directions) => (pendingMove = move)"
      />
    </TheLoader>

    <p class="instruction" v-if="instruction">{{ instruction }}</p>

    <PendingDirection
      v-if="pendingMove"
      :directions="pendingMove"
      class="pendingMove"
    />

    <div class="navTypes">
      <button
        :disabled="!!pendingMove"
        @click="() => !!pendingMove && (pendingMove.type = 'rideShares')"
      >
        Rideshare
      </button>
      <button
        :disabled="!!pendingMove"
        @click="() => !!pendingMove && (pendingMove.type = 'bus')"
      >
        Bus
      </button>
      <button
        :disabled="!!pendingMove && busAvalible(pendingMove)"
        @click="() => !!pendingMove && (pendingMove.type = 'walk')"
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

.instruction {
  grid-row: 2/3;
  grid-column: 4/5;
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
.estimates {
  grid-row: 3/4;
  grid-column: 3/4;
}
.pendingMove {
  grid-column: 4/5;
  grid-row: 3/4;
}
// an unscoped scss is required in App.vue for main.scss to properly load.
// Components don't need this.
// and to be honest i have no idea why
@font-face {
  font-family: '04b09regular';
  src: url('04b_09__-webfont.woff2') format('woff2'),
    url('04b_09__-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
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
