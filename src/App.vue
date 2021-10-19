<template>
  <div class="container">
      <span class="text">Welcome!</span>
  </div>
  <magic-card>
    <a target="_blank" href="https://app.daily.dev/louis_lu"
    ><img
      src="https://api.daily.dev/devcards/7c8923e98d044c82af8a8b9fcf8e7a01.png?r=dxp"
      width="400"
      alt="louislu lu's Dev Card"
  /></a>
  </magic-card>
</template>

<script setup>
import MagicCard from './components/MagicCard.vue'
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 6rem auto;
  /* display: flex; */
  justify-content: center;
}
div.container {
  display: flex;
  flex-direction: column;
}
span.text {
  font-size: 6rem;
}
</style>
