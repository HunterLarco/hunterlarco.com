import { createApp } from "vue";

import App from "@/App.vue";
import router from "@/router";

import WindowSizeStore from "@/stores/WindowSizeStore";
import VueSizingPlugin from "@/plugins/VueSizingPlugin";

createApp(App)
  .use(router)
  .use(WindowSizeStore)
  .use(VueSizingPlugin)
  .mount("#app");

WindowSizeStore.dispatch('autoUpdateWidth');

if (process.env.NODE_ENV != "production") {
  require("@/debug/console");
}
