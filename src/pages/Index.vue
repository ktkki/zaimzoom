<template lang="pug">
  #Index
    .title
      h1
        span.z Z
        span aim
      h1
        span.z Z
        span oom
    .start
      router-link.is-fever(to="/lobby", tag="button") スタート
</template>

<script>
import { mapActions } from "vuex";
import * as actions from "@/store/actionTypes";

export default {
  name: "Index",
  data() {
    return {};
  },
  beforeMount() {
    this.fetchCodes();
    this.fetchCategories();
  },
  methods: {
    ...mapActions({
      fetchCodes: actions.FETCH_CODES,
      fetchCategories: actions.FETCH_CATEGORIES,
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="postcss">
@import "../pallet.precss";

#Index {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(-135deg, $pink 45px, transparent 45px)64px 64px,
    linear-gradient(
      -135deg,
      $pink 45px,
      transparent 45px,
      transparent 91px,
      #999 91px,
      #999 135px,
      transparent 135px
    ),
    linear-gradient(
      135deg,
      $pink 23px,
      transparent 23px,
      transparent 68px,
      $pink 68px,
      $pink 113px,
      transparent 113px,
      transparent 158px,
      $pink 158px
    );
  background-color: #999;
  background-size: 128px 128px;
  .title {
    display: flex;
    margin: auto;
    height: 50%;
    width: 95vw;
    h1 {
      font-family: feverji, OogieBoogie;
      letter-spacing: 4px;
      font-size: 3rem;
      transform: rotate(-30deg);
      color: #333;
      margin: auto;
      padding: 0;
      text-shadow: 4px 4px 0 #fff, -4px 4px 0 #fff,
        4px -4px 0 #fff -4px -4px 0 #fff;
      text-shadow: 4px 4px 4px #fff, -4px 4px 1px #fff, 4px -4px 1px #fff,
        -4px -4px 1px #fff;
      ,
      .z {
        font-size: 5rem;
      }
    }
  }
  .start {
    margin: auto;
    width: 40vw;
    button {
      width: 40vw;
      font-size: 1.7rem;
      line-height: 3rem;
      animation: bounce-in 0.5s;
      animation-iteration-count: infinite;
    }
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
