<template lang="pug">
.bs-summary
  section.heading
    h3 バランスシート
  section.data
    .credit
      .elm-child(v-for="elm in currentAssets", class="current-assets", :style="{'flex-grow': elm.ratio}")
        span {{elm.label}}({{isAnswer? elm.amount : elm.ratio}})
      .elm-child(v-for="elm in nonCurrentAssets", class="non-current-assets" :style="{'flex-grow': elm.ratio}")
        span {{elm.label}}({{isAnswer? elm.amount : elm.ratio}})
    .debit
      .elm-child(v-for="elm in liabilities", class="liabilities" :style="{'flex-grow': elm.ratio}")
        span {{elm.label}}({{isAnswer? elm.amount : elm.ratio}})
      .elm-child(v-for="elm in equity", class="equity", :style="{'flex-grow': elm.ratio}")
        span {{elm.label}}({{isAnswer? elm.amount : elm.ratio}})
</template>

<script>
export default {
  name: "BsSummary",
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
    currentAssets() {
      return this.$store.getters.getChildrenById(
        this.secCode,
        "bs",
        "_currentassetsabstract"
      );
    },
    nonCurrentAssets() {
      return this.$store.getters.getChildrenById(
        this.secCode,
        "bs",
        "_noncurrentassetsabstract"
      );
    },
    liabilities() {
      return this.$store.getters.getChildrenById(
        this.secCode,
        "bs",
        "_liabilitiesabstract"
      );
    },
    equity() {
      return this.$store.getters.getChildrenById(
        this.secCode,
        "bs",
        "_netassetsabstract"
      );
    },
  },
};
</script>

<style lang="postcss" scoped>
@import "../pallet.precss";

.bs-summary {
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
  height: 90%;
  width: 100%;
  padding: 0 0 2.5rem 0;
  box-sizing: border-box;
}
.credit,
.debit {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #eee;
  font-weight: 900;
  width: 50%;
}
.credit {
  padding: 0 0 0 0.5rem;
  & .current-assets {
    background-color: color-mod($pink alpha(100%));
    &:nth-child(even) {
      background-color: color-mod($pink alpha(70%));
    }
  }
  & .non-current-assets {
    background-color: color-mod($purple alpha(100%));
    &:nth-child(even) {
      background-color: color-mod($purple alpha(70%));
    }
  }
}
.debit {
  padding: 0 0.5rem 0 0;
  & .liabilities {
    background-color: color-mod($green alpha(100%));
    &:nth-child(even) {
      background-color: color-mod($green alpha(70%));
    }
  }
  & .equity {
    background-color: color-mod($orange alpha(100%));
    &:nth-child(even) {
      background-color: color-mod($orange alpha(70%));
    }
  }
}
.elm-child {
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  & span {
    font-size: 0.75rem;
    font-weight: 400;
  }
}
</style>
