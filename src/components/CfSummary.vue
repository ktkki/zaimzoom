<template lang="pug">
.cf-summary
  section.heading
    h3 キャッシュフロー
  section.data
    .elm.operating
      h5 {{operating.label}}
      .elm-plus
        .pad-full(v-if="operating.ratio < 0", :style="{'flex-grow': 20}") {{operating.ratio}}
        .pad(v-if="operating.ratio > 0", :style="{'flex-grow': 20 - operating.ratio}")
        .graph(v-if="operating.ratio > 0", :style="{'flex-grow': operating.ratio}")
      .elm-minus
        .graph(v-if="operating.ratio < 0", :style="{'flex-grow': -operating.ratio}")
        .pad(v-if="operating.ratio < 0", :style="{'flex-grow': 20 - -operating.ratio}")
        .pad-full(v-if="operating.ratio > 0", :style="{'flex-grow': 20}") {{operating.ratio}}
    .elm.investment
      h5 {{investment.label}}
      .elm-plus
        .pad-full(v-if="investment.ratio < 0", :style="{'flex-grow': 20}") {{investment.ratio}}
        .pad(v-if="investment.ratio > 0", :style="{'flex-grow': 20 - investment.ratio}")
        .graph(v-if="investment.ratio > 0", :style="{'flex-grow': investment.ratio}")
      .elm-minus
        .graph(v-if="investment.ratio < 0", :style="{'flex-grow': -investment.ratio}")
        .pad(v-if="investment.ratio < 0", :style="{'flex-grow': 20 - -investment.ratio}")
        .pad-full(v-if="investment.ratio > 0", :style="{'flex-grow': 20}") {{investment.ratio}}
    .elm.financing
      h5 {{financing.label}}
      .elm-plus
        .pad-full(v-if="financing.ratio < 0", :style="{'flex-grow': 20}") {{financing.ratio}}
        .pad(v-if="financing.ratio > 0", :style="{'flex-grow': 20 - financing.ratio}")
        .graph(v-if="financing.ratio > 0", :style="{'flex-grow': financing.ratio}")
      .elm-minus
        .graph(v-if="financing.ratio < 0", :style="{'flex-grow': -financing.ratio}")
        .pad(v-if="financing.ratio < 0", :style="{'flex-grow': 20 - -financing.ratio}")
        .pad-full(v-if="financing.ratio > 0", :style="{'flex-grow': 20}") {{financing.ratio}}
</template>

<script>
export default {
  name: "CfSummary",
  props: {
    secCode: {
      type: Number,
      default: 0,
      required: true,
    },
    isAnswer: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  computed: {
    company() {
      return this.$store.getters.getCompanyByCode(this.secCode);
    },
    operating() {
      return this.$store.getters.getElementById(
        this.secCode,
        "cf",
        "_netcashprovidedbyusedinoperatingactivities"
      );
    },
    investment() {
      return this.$store.getters.getElementById(
        this.secCode,
        "cf",
        "_netcashprovidedbyusedininvestmentactivities"
      );
    },
    financing() {
      return this.$store.getters.getElementById(
        this.secCode,
        "cf",
        "_netcashprovidedbyusedinfinancingactivities"
      );
    },
  },
};
</script>

<style lang="postcss" scoped>
@import "../pallet.precss";

.cf-summary {
  overflow-y: hidden;
  height: 100%;
  width: 100vw;
}
.heading {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 10%;
  h3 {
    margin: 0;
    padding: 0;
    letter-spacing: 1px;
    font-weight: 400;
    font-family: feverji, OogieBoogie;
    line-height: 2.5rem;
    font-size: 1.5rem;
    text-align: center;
  }
}
.data {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  height: 75%;
  width: 95%;
  border-radius: 2rem;
  padding: 1rem 1rem;
  margin: 1.5rem auto;
  background-color: color-mod(#eee alpha(80%));
  .elm {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    .elm-plus,
    .elm-minus {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      justify-content: center;
      align-items: center;
      height: 50%;
      .graph {
        background-color: $pink;
        width: 100%;
      }
      .pad {
        background-color: transparent;
        width: 100%;
      }
      .pad-full {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: transparent;
        width: 100%;
        font-size: 1rem;
        font-weight: 900;
        padding: 1rem;
      }
    }
    .elm-plus {
      border-bottom: 2px solid #444;
      .pad-full {
        justify-content: flex-end;
      }
    }
  }
  h5 {
    font-size: 0.75rem;
    font-weight: 400;
  }
}
</style>
