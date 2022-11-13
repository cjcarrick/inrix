<script setup lang="ts">
import { ref } from 'vue'
import Estimated from './components/Estimates.vue'
import MapView from './components/MapContainer.vue'
import SubmitButton from './components/SubmitButton.vue'
import TheLoader from './components/TheLoader.vue'
import Buttons from './views/HomeView.vue'
import LowerPanel from './components/LowerPanel.vue'

const games = ref()
</script>

<template>
  <div class="mainGrid">
    <h1 class="logo">RouteFyndr</h1>

    <TheLoader>
      <MapView class="map" />
    </TheLoader>

    <LowerPanel :game="game" />

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
  grid-template-rows: 2em auto 10em;
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
.buttonPres {
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
