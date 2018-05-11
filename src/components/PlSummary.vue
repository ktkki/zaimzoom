<template lang="pug">
.pl-summary
  section.heading
    h3 プロフィット＆ロス
  section.data
    .credit
      .elm-child(class="operating-income", :style="{'flex-grow': operatingIncome.ratio}")
        span {{operatingIncome.label}}({{isAnswer? operatingIncome.amount : operatingIncome.ratio}})
      .elm-child(class="cost-of-sales", :style="{'flex-grow': costOfSales.ratio}")
        span {{costOfSales.label}}({{isAnswer? costOfSales.amount : costOfSales.ratio}})
      .elm-child(class="hankanhi", :style="{'flex-grow': hankanhi.ratio}")
        span {{hankanhi.label}}({{isAnswer? hankanhi.amount : hankanhi.ratio}})
    .debit
      .elm-child(class="net-sales", :style="{'flex-grow': netSales.ratio}")
        span {{netSales.label}}({{isAnswer? netSales.amount : netSales.ratio}})
</template>

<script>
export default {
  name: "PlSummary",
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
    netSales() {
      return this.$store.getters.getElementById(
        this.secCode,
        "pl",
        "_netsales"
      );
    },
    costOfSales() {
      return this.$store.getters.getElementById(
        this.secCode,
        "pl",
        "_costofsales"
      );
    },
    operatingIncome() {
      return this.$store.getters.getElementById(
        this.secCode,
        "pl",
        "_operatingincome"
      );
    },
    hankanhi() {
      return this.$store.getters.getElementById(
        this.secCode,
        "pl",
        "_sellinggeneralandadministrativeexpenses"
      );
    },
  },
};
</script>

<style lang="postcss" scoped>
@import "../pallet.precss";

.pl-summary {
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
  width: 50%;
  font-size: 0.8rem;
  color: #eee;
  font-weight: 900;
}
.credit {
  padding: 0 0 0 0.5rem;
  & .operating-income {
    background-color: color-mod($pink alpha(95%));
    &:nth-child(even) {
      background-color: color-mod($pink alpha(80%));
    }
  }
  & .cost-of-sales {
    background-color: color-mod($purple alpha(95%));
    &:nth-child(even) {
      background-color: color-mod($purple alpha(80%));
    }
  }
  & .hankanhi {
    background-color: color-mod($orange alpha(95%));
    &:nth-child(even) {
      background-color: color-mod($orange alpha(80%));
    }
  }
}
.debit {
  padding: 0 0.5rem 0 0;
  color: #444;
  & .net-sales {
    background-color: color-mod(#ddd alpha(90%));
    &:nth-child(even) {
      background-color: color-mod(#ddd alpha(80%));
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
