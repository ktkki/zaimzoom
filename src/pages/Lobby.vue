<template lang="pug">
  div#app
    h3 会社を探しています・・・
    ul(v-for="company in companies")
      li: span {{ company.name }}
    router-link(to = "/quiz", tag = "button") はじめる
    button(@click = "pickCompanies(5)") やりなおす
</template>

<script>
import { mapState, mapActions } from "vuex";
import * as actions from "@/store/actionTypes";

export default {
  name: "Lobby",
  data() {
    return {};
  },
  computed: mapState({
    picked: state => state.data.picked,
    companies: state => state.data.companies,
  }),
  beforeMount() {
    this.fetchCodes();
    this.fetchCategories();
  },
  methods: {
    ...mapActions({
      fetchCodes: actions.FETCH_CODES,
      fetchCategories: actions.FETCH_CATEGORIES,
      pickCompanies: actions.PICK_COMPANIES,
    }),
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
  width: 100%;
}
</style>
