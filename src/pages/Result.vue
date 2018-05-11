<template lang="pug">
  div#Result(@click="showResult")
    .header
      h3  Result
    .content
      .list(v-if="isDisplay >= 1")
        .company(v-if="isDisplay >= index+1", v-for="(secCode, index) in correctAnswer" :class="marks[index] ? 'correct' : 'wrong'", :key="index")
          span.name {{ getCompanyByCode(secCode).info.name }}
          span.marks {{ marks[index] ? "〇":"×" }}
      .result
        .score(v-if="isDisplay >= 6")
          span {{ score }}
          span /
          span {{ marks.length }}
        .comment(v-if="isDisplay >= 6")
          span {{ comment }}

    .footer(v-if="isDisplay >= 6")
      router-link.is-fever.is-pink(to="/answer", tag="button") こたえをみる
      router-link.is-fever.is-orange(to="/lobby", tag="button") リトライ
      router-link.is-fever(to="/", tag="button") トップ
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Result",
  data() {
    return {
      score: 0,
      marks: [],
      comment: "",
      isDisplay: 0,
    };
  },
  computed: {
    ...mapState({
      pickedCompanies: state => state.data.pickedCompanies,
      userAnswer: state => state.data.userAnswer,
      correctAnswer: state => state.data.correctAnswer,
    }),
    ...mapGetters(["getCompanyByCode"]),
  },
  beforeMount() {
    this.getScore();
  },
  methods: {
    getScore() {
      for (let i in this.correctAnswer) {
        if (this.userAnswer[i] === this.correctAnswer[i]) {
          this.marks.push(true);
          this.score++;
        } else {
          this.marks.push(false);
        }
      }
      let ratio = this.score / this.marks.length;
      if (ratio < 0.2) {
        this.comment = "Oops...";
      } else if (ratio < 0.6) {
        this.comment = "Good";
      } else if (ratio < 0.8) {
        this.comment = "Great!";
      } else if (ratio < 1) {
        this.comment = "Excellent!!";
      } else if (ratio === 1) {
        this.comment = "Perfect!!";
      }
    },
    // enter の初めにインデックス×100でディレイを付ける
    showResult() {
      if (this.isDisplay < 6) {
        this.isDisplay = this.isDisplay + 1;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="postcss">
@import "../pallet.precss";

#Result {
  height: 100%;
  background: #888;
  background-image: radial-gradient(#999 20%, transparent 0),
    radial-gradient(#999 20%, transparent 0);
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
}
.header {
  height: 10%;
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
    letter-spacing: 4px;
  }
}

.content {
  padding: 0.5rem 0;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 1.5rem;
  height: 80%;
  width: 95vw;
  margin: auto;
  padding: 0.5rem 0;
  .company {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 1rem;
    font-size: 0.9rem;
    line-height: 1.8rem;
    font-weight: 900;
    margin: 0.3rem auto;
    padding: 0.3rem 1rem;
    color: #eee;
    .marks {
      font-size: 1.5rem;
      line-height: 1.5rem;
      width: 1.5rem;
      text-align: center;
    }
    &.correct {
      background-color: color-mod($green alpha(90%));
      .marks {
        color: #eee;
      }
    }
    &.wrong {
      background-color: color-mod(#444 alpha(90%));
      .marks {
        color: red;
      }
    }
  }
}
.result {
  border-radius: 1rem;
  margin: auto;
  width: 95%;
  background-color: #fd8700;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 35px,
    #ff5b01 30px,
    rgba(255, 255, 255, 0.5) 30px,
    rgba(255, 255, 255, 0.5) 60px
  );
  .score,
  .comment {
    height: 8%;
    font-family: feverji, OogieBoogie;
    font-size: 2rem;
    font-weight: 900;
    text-align: center;
    margin: auto;
    color: #444;
    letter-spacing: 4px;
    text-shadow: 2px 2px 0 #fff, -2px 2px 0 #fff,
      2px -2px 0 #fff -2px -2px 0 #fff;
    text-shadow: 2px 2px 1px #fff, -2px 2px 1px #fff, 2px -2px 1px #fff,
      -2px -2px 1px #fff;
    span {
      margin: 0 0.5rem;
    }
  }
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 0;
  height: 30%;
  button {
    width: 90vw;
    font-size: 1.2rem;
  }
}
</style>
