import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { createPinia } from "pinia";

import Toast, { POSITION } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.use(Toast, { position: POSITION.BOTTOM_RIGHT, timeout: 2000 });

app.mount("#app");
