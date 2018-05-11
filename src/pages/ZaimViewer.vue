<template lang="pug">
  #ZaimViewer
    section.header
      .company-name
        span.index {{swipeIndex + 1}}
        span.name {{(company !== null) ? company.info.name : ""}}
    swipe.my-swipe(:auto="0", :speed="100" @change="setSwipeIndex")
      swipe-item.slide(v-for="secCode in correctAnswer", :key="secCode")
        component(:is="selectedComp", :secCode="parseInt(secCode)", :isAnswer="isAnswer")
    section.fotter
      button.is-fever(@click="toggleZaim") {{selectedZaim}}
      button.is-fever(@click="toggleDetail") {{isDetail ? "しょうさい" : "サマリー"}}
      button.is-fever.is-orange(v-if="!isAnswer", @click="showModal = true") かいとう
      router-link.is-fever.is-orange(v-if="isAnswer", to="/result" ,tag="button") もどる
    transition(name="modal")
      answer-modal(v-if="showModal" :index="swipeIndex", @close="showModal = false")
</template>

<script>
import { Swipe, SwipeItem } from "vue-swipe";
import BsSummary from "@/components/BsSummary";
import BsDetail from "@/components/BsDetail";
import PlSummary from "@/components/PlSummary";
import PlDetail from "@/components/PlDetail";
import CfSummary from "@/components/CfSummary";
import CfDetail from "@/components/CfDetail";
import AnswerModal from "@/components/AnswerModal";

import { mapState } from "vuex";

export default {
  name: "ZaimViewer",
  components: {
    swipe: Swipe,
    "swipe-item": SwipeItem,
    "bs-summary": BsSummary,
    "bs-detail": BsDetail,
    "pl-summary": PlSummary,
    "pl-detail": PlDetail,
    "cf-summary": CfSummary,
    "cf-detail": CfDetail,
    "answer-modal": AnswerModal,
  },
  props: {
    isAnswer: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      selectedComp: "bs-summary",
      selectedZaim: "bs",
      isDetail: false,
      swipeIndex: 0,
      showModal: false,
    };
  },
  computed: {
    ...mapState({
      correctAnswer: state => state.data.correctAnswer,
      userAnswer: state => state.data.userAnswer,
    }),
    company() {
      let secCode;

      if (this.isAnswer) {
        secCode = this.correctAnswer[this.swipeIndex];
      } else {
        secCode = this.userAnswer[this.swipeIndex];
      }

      if (secCode !== undefined) {
        return this.$store.getters.getCompanyByCode(secCode);
      } else {
        return null;
      }
    },
  },

  methods: {
    toggleZaim() {
      switch (this.selectedZaim) {
        case "bs":
          this.selectedZaim = "pl";
          break;
        case "pl":
          this.selectedZaim = "cf";
          break;
        case "cf":
          this.selectedZaim = "bs";
          break;
      }
      let type = "summary";
      if (this.isDetail) {
        type = "detail";
      }
      this.selectedComp = `${this.selectedZaim}-${type}`;
    },
    toggleDetail() {
      this.isDetail = !this.isDetail;
      let type = "summary";
      if (this.isDetail) {
        type = "detail";
      }
      this.selectedComp = `${this.selectedZaim}-${type}`;
    },
    setSwipeIndex(newIndex, oldIndex) {
      this.swipeIndex = newIndex;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="postcss">
@import "../pallet.precss";

#ZaimViewer {
  height: 100%;
  background: repeating-linear-gradient(
    -45deg,
    #999,
    #999 20px,
    #aaa 0,
    #aaa 40px
  );
  color: $font-color;
}
.my-swipe {
  height: 80%;
}
.slide {
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
  & .company-name {
    color: #fff;
    padding: 0 0.5rem;
    width: 90%;
    border-radius: 1.5rem;
    font-size: 1rem;
    font-weight: 900;
    line-height: 2.5rem;
    $pink: #d6547e;
    background-color: $pink;
    & .index {
      padding: 0 0.5rem;
      font-size: 1.1rem;
      font-family: feverji, OogieBoogie;
    }
  }
}
.fotter {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 10%;
  background-color: rgba(0, 0, 0, 0.2);
  button {
    line-height: 2.3rem;
    padding: 0 1.5rem;
  }
}
</style>
