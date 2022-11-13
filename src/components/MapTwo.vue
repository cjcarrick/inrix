<script setup lang="ts">
import {
  BusData,
  Coordinates,
  Directions,
  RideShareData,
  TransportTypes
} from 'lib'
import { inject, ref } from 'vue'
const props = defineProps<{
  buses: BusData[]
  rideShares: RideShareData[]
  from: Coordinates
  to: Coordinates
}>()

const emit = defineEmits(['setActive'])

// SF center
const center = ref([-122.4418518, 37.7623168])
const zoom = ref(12)

const projection = ref('EPSG:4326')
const rotation = ref(0)

const format = inject('ol-format')

const geoJson = new format.GeoJSON()
const selectConditions = inject('ol-selectconditions')
const selectCondition = selectConditions.click

const placePoint = (cord: Coordinates, type: TransportTypes) => {
  const directions: Directions = {
    from: props.from,
    to: cord,
    type
  }
  emit('setActive', directions)
}

const featureSelected = (event: any) => {
  console.log(event)
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

    <ol-interaction-select
      :condition="selectCondition"
      v-for="(a, i) in rideShares"
      @select="
        () => placePoint({ lat: a.location.lat, lon: a.location.lon }, 'walk')
      "
      :key="i"
    >
      <ol-vector-layer>
        <ol-source-vector>
          <ol-feature>
            <ol-geom-point
              :coordinates="[a.location.lon, a.location.lat]"
            ></ol-geom-point>
            <ol-style>
              <ol-style-icon src="https://placebear.com/200/250" :scale="0.09">
              </ol-style-icon>
            </ol-style>
          </ol-feature>
        </ol-source-vector>
      </ol-vector-layer>
    </ol-interaction-select>

    <ol-interaction-select
      :condition="selectCondition"
      v-for="(a, i) in buses"
      @select="() => placePoint({ lat: a.lat, lon: a.lon }, 'bus')"
      :key="i"
    >
      <ol-vector-layer>
        <ol-source-vector>
          <ol-feature>
            <ol-geom-point :coordinates="[a.lon, a.lat]"></ol-geom-point>
            <ol-style>
              <ol-style-icon
                src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Aiga_bus_on_blue_circle.svg"
                :scale="0.03"
              >
              </ol-style-icon>
            </ol-style>
          </ol-feature>
          <ol-feature>
            <ol-geom-point :coordinates="[from.lon, from.lat]"></ol-geom-point>
            <ol-style>
              <ol-style-icon
                src="https://upload.wikimedia.org/wikipedia/commons/f/f2/BSicon_WALK.svg"
                scale="0.05"
              >
              </ol-style-icon>
            </ol-style>
          </ol-feature>
          <ol-feature>
            <ol-geom-point :coordinates="[to.lon, to.lat]"></ol-geom-point>
            <ol-style>
              <ol-style-icon
                src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Map_pin_icon.svg"
                scale="0.2"
              >
              </ol-style-icon>
            </ol-style>
          </ol-feature>
          <ol-feature>
            <ol-geom-line-string
              :coordinates="[
                [from.lon, from.lat],
                [to.lon, to.lat]
              ]"
            ></ol-geom-line-string>
            <ol-style>
              <ol-style-stroke
                :color="'rgba(192,0,0,1)'"
                :width="3.5"
              ></ol-style-stroke>
            </ol-style>
          </ol-feature>
        </ol-source-vector>
      </ol-vector-layer>
    </ol-interaction-select>
  </ol-map>
</template>
