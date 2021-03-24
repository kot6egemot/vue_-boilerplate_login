import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import Home from "../views/Home.vue";
import ListItem from "@/components/admin/ListItems";
import ItemUpdate from "@/components/admin/ItemUpdate";
import ItemCreate from "@/components/admin/ItemCreate";
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
    children: [
      {
        path: "users",
        component: ListItem,
        props: { title: "Пользователи", entity: "users" }
      },
      {
        path: "users/update/:id",
        component: ItemUpdate,
        props: { title: "Пользователи", entity: "users" }
      },
      {
        path: "users/create",
        component: ItemCreate,
        props: { title: "Пользователи", entity: "users" }
      }
    ]
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
