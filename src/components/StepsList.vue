<script setup lang="ts">
import { ref } from 'vue'
import { Directions } from '../../lib'

const props = defineProps<{ directions: Directions[] }>()

const emit = defineEmits(['focusStep'])

const focusedStep = ref<undefined | number>(undefined)

const focusStep = (stepIndex: number) => {
  focusedStep.value = stepIndex
  emit('focusStep', stepIndex)
}
</script>

<template>
  <div class="steps">
    <div
      class="step"
      :class="{ focused: focusedStep == i }"
      v-for="(direction, i) in directions"
      :key="i"
      @click="() => focusStep(i)"
    >
      <p>Type: {{ direction.type }}</p>
      <p>From: {{ direction.from }}</p>
      <p>To: {{ direction.to }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.focused {
  border: 2px solid yellow;
}
</style>
