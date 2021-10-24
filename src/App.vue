<template>
  <div class="container">

    <div class="profile">

      <div class="info">
        <img width="100" height="100" src="./assets/portrait.png" />
        <div>
          <p>Louis Lu</p>
          <p>陆 祎洲</p>
        </div>
      </div>

    </div>

    <div class="route">
      <magic-card />
    </div>

  </div>
</template>

<script setup>
import MagicCard from './components/MagicCard.vue'
</script>


<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #484a4d;
  display: flex;
  margin: 0rem auto;
  justify-content: center;
  max-width: 1800px;
  min-height: 100vh;
  background-color: aliceblue;
}
div.container {
  display: flex;
  margin: 2rem 0;
  border-radius: 1rem;
  overflow: hidden;
}
div.profile {
  width: 240px;
  font-size: 1.25rem;
  background-color: #fefefe;
  padding: 1rem 4rem 1rem 1rem;
  box-shadow: 8px 0px 20px -18px #30303080;
  z-index: 1;
}
div.route {
  flex-grow: 1;
}
.info {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  font-weight: 600;
}
.info img {
  border-radius: 50%;
  border: 5px solid #f0f0f0;
  object-fit: cover;
  transition: all 250ms ease-in-out;
}
.info img:hover {
  box-shadow: 0px 0px 24px 0px #30303020, 1px 1px 6px -2px #00307070;
}
.info p {
  text-align: start;
}
.route {
  background-color: #fefefe;
  padding: 1rem;
  min-width: 60vw;
}
</style>
