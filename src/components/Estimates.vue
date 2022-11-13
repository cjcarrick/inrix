<template>
    <div>
    <p>Estimated Cost</p>
    <h4>{{ money }}</h4>
    <p>Estimated Time</p>
    <h4>{{ time }}</h4>
    </div>
</template >
<script setup lang="ts">
 defineProps<{ money: string;time:string }>()
</script>