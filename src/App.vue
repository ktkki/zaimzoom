<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="postcss">
@import "vue-swipe/dist/vue-swipe.css";
@import "sanitize.css/sanitize.css";
@import "pallet.precss";

@font-face {
  font-family: "OogieBoogie";
  src: url("font/OogieBoogie.eot?") format("eot"),
    url("font/OogieBoogie.woff") format("woff");
}

@font-face {
  font-family: "feverji";
  src: url("font/feverji.eot?") format("eot"),
    url("font/feverji.woff") format("woff");
}

html,
body {
  height: 100%;
  overflow: hidden;
}

#app {
  height: 100%;
  font-family: "-apple-system, Avenir", Helvetica, Arial, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

button {
  border: none;
  border-radius: 1.5rem;
  background-color: $font-color;
  color: #eee;
  font-weight: 600;
  line-height: 2rem;
  &.is-fever {
    font-family: feverji, OogieBoogie;
    font-weight: 400;
    padding: 0.3rem 0.8rem;
  }
  &.is-pink {
    background-color: $pink;
  }
  &.is-orange {
    background-color: $orange;
  }
  &.is-purple {
    background-color: $purple;
  }
  &.is-green {
    background-color: $green;
  }
  &:disabled {
    background-color: #999;
  }
}
</style>
