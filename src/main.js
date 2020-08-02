import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Boostrap
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { faStripe } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./assets/sass/index.sass";

Vue.use(BootstrapVue);
library.add(faAngleDoubleRight);
library.add(faAngleDoubleLeft);
library.add(faTrashAlt);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
