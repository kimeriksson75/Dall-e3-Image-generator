import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

const app = createApp(App);
app.config.errorHandler = (err, vm, info) => {
  console.error(err, vm, info);
};
app.use(store);
app.use(router);
app.use(ToastPlugin);
app.mount("#app");
