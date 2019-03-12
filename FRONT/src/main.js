import Vue from "vue";
import App from "./App.vue";
import {router} from "./router";
import FBSignInButton from "vue-facebook-signin-button";
Vue.use(FBSignInButton);
import store from "./stores/store";

import * as VueGoogleMaps from "vue2-google-maps";

import Axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
const accessToken = localStorage.getItem("access_token");

if (accessToken) {
	Vue.prototype.$http.defaults.headers.common["Authorization"] = accessToken;
}

Vue.use(VueGoogleMaps, {
	load: {
		key: "AIzaSyA47jJdht6eK4qGqiTaBY6uypZHYHuZnH0"
	},
	libraries: 'directions',
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
