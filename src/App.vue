<script setup lang="ts"></script>

<template>
  <!-- <div id="nav"> -->
  <!--   <router-link to="/">Home</router-link> | -->
  <!--   <router-link to="/about">About</router-link> | -->
  <!--   <router-link to="/todos">Todos</router-link> | -->
  <!--   <router-link to="/todos/1">First Todo</router-link> -->
  <!-- </div> -->
  <!-- <router-view /> -->

  <!-- <main> -->

  <!-- </main> -->

  <main></main>
</template>

<style lang="scss">
// an unscoped scss is required in App.vue for main.scss to properly load.
// Components don't need this.
// and to be honest i have no idea why

main {
  display: grid;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  grid-template-columns: 10px auto;
  grid-template-rows: 100px auto;
}
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
