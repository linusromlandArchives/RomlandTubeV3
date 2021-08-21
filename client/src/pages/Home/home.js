import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Home from "./Home.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Home),
}).$mount("#app");
