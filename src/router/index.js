import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import Home from "../views/Home.vue";
import store from "@/store";
import List from "@/components/admin/List";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "users",
        component: List,
        props: { title: "Пользователи", entity: "users" }
      }
    ]
  },
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let isAuthenticated = store.getters.isAuth;
  if (to.name === "Login" && isAuthenticated) next({ name: "Home" });
  if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  else next();
});

export default router;
