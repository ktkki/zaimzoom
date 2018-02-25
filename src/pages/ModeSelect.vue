<template lang="pug">
  div#app
    h1 ZaimZoom
    h2 モードセレクト
    ul
      li: router-link(to="/lobby") クイズ
      li: router-link(to="/zoom") ズーム
</template>

<script>
import { mapActions } from "vuex";
import * as actions from "@/store/actionTypes";

export default {
  name: "ModeSelect",
  data() {
    return {};
  },
  mounted() {
    this.fetchCodes();
  },
  methods: {
    ...mapActions({ fetchCodes: actions.FETCH_CODES }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="postcss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
