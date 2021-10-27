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

      <hr/>

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
  flex-direction: column;
  margin: 5rem 0 2rem;
  border-radius: 1rem;
  box-shadow: 1px 1px 16px -5px #30303030;
}
div.profile {
  height: 240px;
  font-size: 1.25rem;
  background-color: #fefefe;
  padding: 1rem 2rem;
  border-radius: 1rem 1rem 0 0;
  z-index: 1;
}
.profile hr {
  border: 1px solid #f0f0f0;
  margin-top: 4rem;
  width: 100%
}
div.route {
  flex-grow: 1;
}
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  margin: -60px 2rem;
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
  text-align: center;
}
.route {
  background-color: #fefefe;
  padding: 1rem;
  min-width: 60vw;
  border-radius: 0 0 1rem 1rem;
}
</style>
