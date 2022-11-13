<script setup lang="ts">
 import Buttons from './views/HomeView.vue'
 import SubmitButton from './components/SubmitButton.vue'
 import Estimated from './components/Estimates.vue'
</script>

<template>
  <!-- <div id="nav"> -->
    <!-- <router-link to="/">Home</router-link> | -->
    <!-- <router-link to="/about">About</router-link> |
    <router-link to="/todos">Todos</router-link> |
    <router-link to="/todos/1">First Todo</router-link>
  </div> -->
  <div class = "Maingrid">
    <h1>RouteFyndr</h1>
    <Buttons class = "ButtonPos"/>
    <SubmitButton class = "SubPosition"/>
    <Estimated class = "Est" :money="10" :time="10"/>
  </div>
  <router-view />
</template>

<style lang="scss">
  .Maingrid{
    display: grid;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height:100vh;
    grid-template-columns: 11em 20em 5em 10em auto;
    grid-template-rows: 2em auto 10em;
  }
  .SubPosition{
    grid-row: 3/4;
    grid-column: 1/2;
  }
  .Est{
    grid-row: 3/4;
    grid-column: 3/4;
  }
  .ButtonPos{
    grid-row: 3/4;
    grid-column: 2/3;
  }
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
