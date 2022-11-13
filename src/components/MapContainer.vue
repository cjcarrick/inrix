<script setup lang="ts">
import { BusData } from 'lib'
import TileLayer from 'ol/layer/Tile'
import Map from 'ol/Map'
import OSM from 'ol/source/OSM'
import View from 'ol/View'
import { onMounted } from 'vue'
// importing the OpenLayers stylesheet is required for having
// good looking buttons!
import 'ol/ol.css'

const props = defineProps<{ buses: BusData[] }>()

onMounted(() => {
  const mapRoot = document.getElementById('map') as HTMLElement

  new Map({
    // the map will be created using the 'map-root' ref
    target: mapRoot,
    layers: [
      // adding a background tiled layer
      new TileLayer({
        source: new OSM() // tiles are served by OpenStreetMap
      })
    ],

    // the map view will initially show the whole world
    view: new View({
      zoom: 4,
      center: [0.5, 0],
      constrainResolution: true
    })
  })
})
</script>

<template>
  <div id="map" ref="mapRoot" style="width: 100%; height: 100%"></div>
</template>
