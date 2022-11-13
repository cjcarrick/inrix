<script setup lang="ts">
const props = defineProps<{
  stats: { key: string; value: string | number }[]
}>()
</script>

<template>
  <div class="stats">
    <div class="stat" v-for="(stat, i) in stats" :key="i">
      <span>{{ stat.key }}</span>
      <div class="num">{{ stat.value }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $pad;
}
.stat {
  flex: 1;
  background: rgba($color: gray, $alpha: 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: $pad;
  gap: $pad;
  border-radius: $br;
  min-width: 4rem;
  @include ms-depth(4);
}
.num {
  background: rgba($color: gray, $alpha: 0.1);
  align-self: center;
  vertical-align: center;
  border-radius: $br;
  flex: 1;
  padding: $pad;
  text-align: end;
}
</style>
