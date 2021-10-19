<template>
  <div
    :style="{
      transform: transform3D
    }" 
    class="magic-card" @mouseenter="handleMouseEnter" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <slot></slot>
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
      return `rotateX(${ (Y / height - 0.5) * 30 }deg) rotateY(${ (X / width - 0.5) * 30 }deg)`
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
  .magic-card {
    display: inline-block;
    transform-style: preserve-3d;
    perspective: -1800px;
  }
</style>