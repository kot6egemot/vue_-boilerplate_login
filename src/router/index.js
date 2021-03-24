import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import Home from "../views/Home.vue";
import { TokenStorage } from "@/utils/token_storage";

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
    children: []
  },
  { path: "*", redirect: "/" }
];

export const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let isAuthenticated = TokenStorage.isAuthenticated();
  if (to.name === "Login" && isAuthenticated) next({ name: "Home" });
  if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  else next();
});

export default router;
