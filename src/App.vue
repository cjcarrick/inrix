<script setup lang="ts"></script>

<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/todos">Todos</router-link> |
    <router-link to="/todos/1">First Todo</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
// an unscoped scss is required in App.vue for main.scss to properly load.
// Components don't need this.
// and to be honest i have no idea why
</style>

<style lang="scss" scoped>
nav {
  padding: 30px;
}

a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: $green;
  }
}
</style>
