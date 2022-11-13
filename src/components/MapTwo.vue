<script setup lang="ts">
import { BusData, Coordinates } from 'lib'
import { inject, ref } from 'vue'
const props = defineProps<{
  buses: BusData[]
  from: Coordinates
  to: Coordinates
}>()

// SF center
const center = ref([-122.4418518, 37.7623168])
const zoom = ref(12)

const projection = ref('EPSG:4326')
const rotation = ref(0)

const format = inject('ol-format')

const geoJson = new format.GeoJSON()
const selectConditions = inject('ol-selectconditions')
const selectCondition = selectConditions.click

const featureSelected = (event: any) => {
  console.log(event)
}

const selectInteactionFilter = (feature: { values_: { name: undefined } }) => {
  return feature.values_.name != undefined
}
</script>

<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 400px"
  >
    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-interaction-select
      @select="featureSelected"
      :condition="selectCondition"
      :filter="selectInteactionFilter"
    >
      <ol-style>
        <ol-style-stroke color="green" :width="10"></ol-style-stroke>
        <ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>
        <ol-style-icon
          src="https://placebear.com/200/250"
          :scale="0.05"
        ></ol-style-icon>
      </ol-style>
    </ol-interaction-select>


    <!-- <ol-source-vector> -->
    <!--   <ol-feature> -->
    <!--     <ol-geom-point :coordinates="[to.lon, to.lat]"></ol-geom-point> -->
    <!--     <ol-style> -->
    <!--       <ol-style-circle :radius="10"> -->
    <!--         <ol-style-fill :color="'orange'"></ol-style-fill> -->
    <!--         <ol-style-stroke :color="'orange'" :width="4"></ol-style-stroke> -->
    <!--       </ol-style-circle> -->
    <!--     </ol-style> -->
    <!--   </ol-feature> -->
    <!-- </ol-source-vector> -->

     

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature v-for="(a, i) in buses" :key="i">
          <ol-geom-point :coordinates="[a.lon, a.lat]"></ol-geom-point>
          <ol-style>
            <ol-style-icon src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Aiga_bus_on_blue_circle.svg" scale="0.03">
            </ol-style-icon>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
    <ol-vector-layer>
       <ol-source-vector>
         <ol-feature>
           <ol-geom-point :coordinates="[from.lon, from.lat]"></ol-geom-point>
           <ol-style>
            <ol-style-icon src="https://upload.wikimedia.org/wikipedia/commons/d/db/Walk_icon.png" scale="0.02">
            </ol-style-icon>
           </ol-style>
         </ol-feature>
       </ol-source-vector>
     </ol-vector-layer> <ol-vector-layer>
       <ol-source-vector>
         <ol-feature>
           <ol-geom-point :coordinates="[to.lon, to.lat]"></ol-geom-point>
           <ol-style>
            <ol-style-icon src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Map_pin_icon.svg" scale="0.2">
            </ol-style-icon>
           </ol-style>
         </ol-feature>
       </ol-source-vector>
     </ol-vector-layer> 
  </ol-map>
</template>
