<script setup lang="ts">
import MapContainer from '../components/MapContainer.vue'
</script>
<template>
  <div id="app">
    <div class="cell cell-map">
      <MapContainer></MapContainer>
    </div>
  </div>
</template>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: grid;
  grid-template-columns: 100vw;
  grid-auto-rows: 7.5em;
  grid-gap: 0rem;
  padding: 1rem;
  box-sizing: border-box;
}

.cell {
  border-radius: 4px;
  background-color: rgb(141, 75, 75);
}

.cell-map {
  grid-column: 1;
  grid-row-start: 1;
  grid-row-end: 3;
}
</style>
