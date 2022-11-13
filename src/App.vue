<script setup lang="ts"></script>

<template>
  <div class="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> 
  </div>
  <router-view />
</template>

<style lang="scss">
// an unscoped scss is required in App.vue for main.scss to properly load.
// Components don't need this.
// and to be honest i have no idea why
</style>
<style lang="scss" scoped>
.nav {
  padding: 1px;
  height: 30%;
}

a {
  font-weight: bold;
  color: #2c3e50;
  height: 10%;
  &.router-link-exact-active {
    color: $green;
  }
}
</style>
