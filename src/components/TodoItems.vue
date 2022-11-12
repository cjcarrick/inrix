<script setup lang="ts">
import { CheckCircleIcon, ClockIcon } from '@heroicons/vue/24/solid'
import type { Todo } from 'lib'

const props = defineProps<{ id?: number }>()

let json: Todo[]

if (props.id !== undefined) {
  const req = await fetch('/api/todos?id=' + props.id)
  json = await req.json()
} else {
  const req = await fetch('/api/todos')
  json = await req.json()
}
</script>

<template>
  <div class="todo" v-for="(t, i) in json" :key="i">
    <p>For User {{ t.userId }}:</p>

    <p>
      <i>{{ t.title }}</i>
    </p>

    <!-- <code> id: {{ t.id }} </code> -->

    <div class="completed status" v-if="t.completed">
      <CheckCircleIcon />
      <span> Completed </span>
    </div>

    <div class="incomplete status" v-else>
      <ClockIcon />
      <span> Incomplete </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todo {
  @include ms-depth(6);
  padding: $pad;
  border-radius: $br;
  margin-bottom: $pad;
}

.status {
  display: flex;
  align-items: center;
  gap: $pad;
  flex-direction: row;
  width: fit-content;
  margin: 0 auto;
}
.completed {
  color: green;
}
.incomplete {
  color: orange;
}
</style>
