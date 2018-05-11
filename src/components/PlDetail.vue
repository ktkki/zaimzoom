<template lang="pug">
.pl-detail
  section.heading
    h3 プロフィット＆ロス
  section.data
    table.table.is-striped.is-fullwidth
      tr(v-for="element in elements", :class="[{'is-total': element.is_total}, 'depth-' + element.depth]")
        td {{element.label}}
        td(v-if="isAnswer") {{(element.depth < 2) ? "" :  element.amount}}
        td {{(element.depth < 2) ? "" :  element.ratio}}
</template>

<script>
import Vue from "vue";
import Vuebar from "vuebar";

Vue.use(Vuebar);

export default {
  name: "PlDetail",
  props: {
    secCode: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    elements() {
      return this.$store.getters.getFlattenElement(this.secCode, "pl");
    },
  },
};
</script>

<style lang="postcss" scoped>
@import "bulma/css/bulma.css";

.pl-detail {
  overflow-y: scroll;
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
  width: 95%;
  margin: auto;
}
td {
  font-size: 0.7rem;
  font-weight: 400;
}
.is-total {
  td {
    border-bottom: 1px solid #999;
    font-weight: 600;
  }
}
.depth-1 {
  td:first-child {
    padding-left: 0.5rem;
  }
  td {
    background-color: #444;
    font-weight: 900;
    color: #eee;
  }
}
.depth-2 {
  td:first-child {
    padding-left: 1rem;
  }
  td {
    background-color: #ddd;
    font-weight: 600;
  }
}
.depth-3 {
  td:first-child {
    padding-left: 1.5rem;
  }
}
.depth-4 {
  td:first-child {
    padding-left: 2rem;
  }
}
.depth-5 {
  td:first-child {
    padding-left: 2.5rem;
  }
  td {
    font-size: 0.7rem;
  }
}
.depth-6 {
  td:first-child {
    padding-left: 3rem;
  }
}
</style>
