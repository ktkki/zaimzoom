<template lang="pug">
#Answer-Modal
    .mask(@click="$emit('close')")
        .container(@click.stop="")
            .header
                .title カイシャをえらぼう！
            .content
                button.select(v-for="company in pickedCompanies", @click="setAnswer(company)")
                    span.index(v-if="userAnswer.indexOf(company.info.security_code) >= 0") {{userAnswer.indexOf(company.info.security_code) + 1 }}
                    span.name {{ company.info.name}}
                button.is-fever.is-green.answer(v-if="!isAllAnswerSelected", @click="$emit('close')") とじる
                router-link.is-fever.is-pink.answer(to="/result", tag="button", v-if="isAllAnswerSelected") ファイナルアンサー?
</template>

<script>
import { mapState, mapGetters } from "vuex";
import * as mutations from "@/store/mutationTypes";

export default {
  name: "AnswerModal",
  props: {
    index: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      pickedCompanies: state => state.data.pickedCompanies,
      userAnswer: state => state.data.userAnswer,
    }),
    ...mapGetters(["isAllAnswerSelected"]),
  },
  methods: {
    setAnswer(company) {
      this.$store.commit(mutations.SET_USER_ANSWER, {
        index: this.index,
        company: company,
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
@import "../pallet.precss";

.mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
}

.container {
  width: 95vw;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 1rem 0.5rem;
  background-color: #ddd;
  border-radius: 1rem;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .title {
    text-align: center;
    margin: 0;
    font-family: feverji;
    font-size: 1.5rem;
  }
  button {
    padding: 0 0.8rem;
    background-color: transparent;
    color: $font-color;
    border-radius: 50%;
    border: 1.25px solid $font-color;
  }
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  .select {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 0.9rem;
    line-height: 2.7rem;
    margin: 0.5rem 0 0;
    .index {
      font-size: 0.9rem;
      font-family: feverji, OogieBoogie;
      background-color: $pink;
      border-radius: 50%;
      line-height: 2rem;
      width: 2rem;
    }
    .name {
      margin: auto;
    }
  }
  .answer {
    margin: 1.3rem 0 0;
    font-size: 1.3rem;
    line-height: 2.5rem;
  }
}

/*
 * transition
 */
.container {
  animation: bounce-in 0.3s ease;
  & .modal-enter-active {
    animation: bounce-in 0.3s;
  }
  & .modal-leave-active {
    animation: bounce-in 0.3s ease reverse;
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
