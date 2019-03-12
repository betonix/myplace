import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./views/Login";
import Home from "./views/Home";
import Register from "./views/Register";
import ChangePassword from "./views/ChangePassword";
import Perfil from "./views/Perfil";
import RecoveryPassword from "./views/RecoveryPassword";
Vue.use(VueRouter);

export const router = new VueRouter({
	//mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/login",
			name: "Login",
			component: Login
		},
		{
			path: "/change-password",
			name: "ChangePassword",
			component: ChangePassword
		},
		{
			path: "/recovery-password",
			name: "RecoveryPassword",
			component: RecoveryPassword
		},
		{
			path: "/perfil",
			name: "Perfil",
			component: Perfil
		},
		{
			path: "/register",
			name: "Register",
			component: Register
		},
		{
			path: "/home",
			name: "Home",
			component: Home
		},
		{ path: "*", redirect: "/home" }
	]
});
router.beforeEach((to, from, next) => {
	// redirect to login page if not logged in and trying to access a restricted page
	const publicPages = ["/login", "/register", "/recovery-password"];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = localStorage.getItem("user");

	if (authRequired && !loggedIn) {
		return next("/login");
	}
	next();
});
