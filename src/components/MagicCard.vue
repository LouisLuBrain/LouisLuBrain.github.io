<template>
  <div class="magic-card-container">
    <div :style="{
        transform: transform3D,
      }" class="magic-card" @mouseenter="handleMouseEnter" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">

      <a style="width: 360px;height:480px" target="_blank" href="https://app.daily.dev/louis_lu">
        <img
          src="https://api.daily.dev/devcards/7c8923e98d044c82af8a8b9fcf8e7a01.png?r=dxp" alt="louislu lu's Dev Card"
          style="width: 100%;height:100%" />
        <div class="highlight" :style="{
          background: background3D,
        }"></div>
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        X: -1,
        Y: -1,
        width: 0,
        height: 0,
      }
    },
    computed: {
      transform3D() {
        if (this.X < 0 || this.Y < 0) return ''
        const { X, Y, height, width } = this
        return `rotateX(${(Y / height - 0.5) * 26}deg) rotateY(${(0.5 - X / width) * 26}deg) scale3d(1.07, 1.07, 1.07)`
      },
      background3D() {
        if (this.X < 0 || this.Y < 0) return ''
        const { X, Y, height, width } = this
        return `linear-gradient(${Math.atan((0.5 * height - Y) / (X - 0.5 * width)) / Math.PI * 180}deg, rgba(255, 255, 255, ${Y / height * 0.5 - 0.2}) 0%, rgba(255, 255, 255, 0.05) 80%)`
      }
    },
    methods: {
      handleMouseEnter(e) {
        this.width = e.target.offsetWidth;
        this.height = e.target.offsetHeight;
      },
      handleMouseMove(e) {
        this.X = e.offsetX;
        this.Y = e.offsetY;
      },
      handleMouseLeave(e) {
        this.X = -1;
        this.Y = -1;
      }
    }
  }
</script>
<style lang="css">
  .magic-card-container {
    perspective: 1440px;
  }

  .magic-card-container > p {
    font-weight: 600;
    font-size: 1.75rem;
    margin: 2rem 0;
    text-align: start;
  }

  .magic-card {
    display: inline-flex;
    align-items: center;
    border-radius: 2rem;
    transition: all 200ms ease-in-out;
    position: relative;
    overflow: hidden;
  }

  .magic-card:hover {
    box-shadow: 0px 0px 15px 5px #22222240;
  }

  .highlight {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    user-select: all;
  }
</style>