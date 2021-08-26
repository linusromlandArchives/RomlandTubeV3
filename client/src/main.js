import Vue from "vue";
import {
	BootstrapVue,
	IconsPlugin
} from "bootstrap-vue";
import VueRouter from "vue-router";
import VueCryptojs from 'vue-cryptojs'
import VueMeta from 'vue-meta'
import routes from "./routes"
import App from "./App.vue";


import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VueMeta)
Vue.use(VueCryptojs)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);

const router = new VueRouter({
	routes: routes,
	mode: "history",
});

Vue.config.productionTip = false;

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");