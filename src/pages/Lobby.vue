<template lang="pug">
  div#Lobby
    .header
      h3 マッチングしています・・・
    transition-group.list(name="list", tag="div", mode="out-in")
      .company(v-for="company in pickedCompanies", :key="company.info.security_code") {{company.info.name}}
    .footer
      router-link.is-fever.is-orange(to = "/quiz", tag = "button") はじめる
      button.is-fever(@click = "pickCompanies(5)") やりなおす
</template>

<script>
import { mapState, mapActions } from "vuex";
import * as actions from "@/store/actionTypes";

export default {
  name: "Lobby",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      pickedCompanies: state => state.data.pickedCompanies,
      securityCodes: state => state.data.securityCodes,
      categories: state => state.data.categories,
    }),
  },
  beforeMount() {
    this.pickCompanies(5);
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
@import "../pallet.precss";
#Lobby {
  height: 100%;
  background: #888;
  background-image: radial-gradient(#999 20%, transparent 0),
    radial-gradient(#999 20%, transparent 0);
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
}
.header {
  height: 15%;
  display: flex;
  h3 {
    border-radius: 1rem;
    background-color: $purple;
    width: 95vw;
    line-height: 3rem;
    font-family: feverji, OogieBoogie;
    font-size: 1.5rem;
    text-align: center;
    margin: auto;
    color: #eee;
  }
}
.list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 1.5rem;
  height: 60%;
  width: 95vw;
  margin: auto;
  padding: 1rem 0;
  background-color: #fd8700;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 35px,
    #ff5b01 30px,
    rgba(255, 255, 255, 0.5) 30px,
    rgba(255, 255, 255, 0.5) 60px
  );
  .company {
    width: 90%;
    border-radius: 1rem;
    font-size: 1rem;
    line-height: 2rem;
    font-weight: 900;
    margin: 0.3rem auto;
    padding: 0.3rem 0.5rem;
    color: #eee;
    background-color: color-mod(#444 alpha(90%));
    transition: all 0.3s ease-in;
    &.list-enter {
      transform: translateX(400px);
      opacity: 0;
    }
    &.list-leave-to {
      transform: translateX(-400px);
      opacity: 0;
    }
    &.list-leave-active {
      position: absolute;
    }
  }
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 0;
  height: 25%;
  button {
    width: 90vw;
    font-size: 1.2rem;
  }
}
</style>
