import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import CreateUserView from "../views/CreateUserView.vue";
import ImageGeneratorView from "../views/ImageGeneratorView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/create-user",
    name: "create-user",
    component: CreateUserView,
  },
  {
    path: "/image-generator",
    name: "image-generator",
    component: ImageGeneratorView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
