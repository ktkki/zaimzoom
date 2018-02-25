import Vue from "vue";
import Router from "vue-router";
import ModeSelect from "@/pages/ModeSelect";
import Lobby from "@/pages/Lobby";
import Quiz from "@/pages/Quiz";
import Result from "@/pages/Result";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "ModeSelect",
      component: ModeSelect,
    },
    {
      path: "/lobby",
      name: "Lobby",
      component: Lobby,
    },
    {
      path: "/Quiz",
      name: "Quiz",
      component: Quiz,
    },
    {
      path: "/Result",
      name: "Result",
      component: Result,
    },
  ],
});
