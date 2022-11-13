<script setup lang="ts">
import { inject, ref } from 'vue'

const center = ref([40, 40])
const projection = ref('EPSG:4326')
const zoom = ref(8)
const rotation = ref(0)

const format = inject('ol-format')

const geoJson = new format.GeoJSON()

const selectConditions = inject('ol-selectconditions')

const selectCondition = selectConditions.click

const featureSelected = event => {
  console.log(event)
}

const selectInteactionFilter = feature => {
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

    <ol-vector-layer>

      <ol-source-vector
        ref="cities"
        url="https://raw.githubusercontent.com/alpers/Turkey-Maps-GeoJSON/master/tr-cities-airports.json"
        :format="geoJson"
        :projection="projection"
      >
      </ol-source-vector>

      <ol-style>
        <ol-style-stroke color="red" :width="2"></ol-style-stroke>
        <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>
        <ol-style-circle :radius="7">
          <ol-style-fill color="blue"></ol-style-fill>
        </ol-style-circle>
      </ol-style>

    </ol-vector-layer>
  </ol-map>
</template>