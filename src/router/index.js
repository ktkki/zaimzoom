import Vue from "vue";
import Router from "vue-router";
import Index from "@/pages/Index";
import Lobby from "@/pages/Lobby";
import ZaimViewer from "@/pages/ZaimViewer";
import Result from "@/pages/Result";
import Store from "@/store/store";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index,
    },
    {
      path: "/lobby",
      name: "Lobby",
      component: Lobby,
    },
    {
      path: "/quiz",
      name: "Quiz",
      component: ZaimViewer,
      props: { isAnswer: false },
    },
    {
      path: "/result",
      name: "Result",
      component: Result,
    },
    {
      path: "/answer",
      name: "Answer",
      component: ZaimViewer,
      props: { isAnswer: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Index") {
    if (
      Object.keys(Store.state.data.securityCodes).length > 0 ||
      Object.keys(Store.state.data.categories).length > 0
    ) {
      next();
    } else {
      next({ name: "Index" });
    }
  } else {
    next();
  }
});

export default router;
