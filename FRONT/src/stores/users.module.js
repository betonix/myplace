import UserService from "../services/UserService";
import { router } from "../router";

const state = {
	user: localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user"))
		: {}
};

const actions = {
	loginEmail(context, payload) {
		localStorage.removeItem("user");
		UserService.loginEmail(payload)
			.then(data => {
				context.commit("SET_USER", data.data);
				localStorage.setItem("user", JSON.stringify(data.data.user));
				localStorage.setItem("access_token", JSON.stringify(data.data.token));
				router.push("/home");
			})
			.catch(data => {
				context.dispatch("util/setMessage", data.data.error, { root: true });
			});
	},

	loginFacebook(context, payload) {
		localStorage.removeItem("user");
		UserService.loginFacebook(payload)
			.then(data => {
				context.commit("SET_USER", data.data.user);
				localStorage.setItem("user", JSON.stringify(data.data.user));
				localStorage.setItem("access_token", JSON.stringify(data.data.token));
				router.push("/home");
			})
			.catch(data => {
				context.dispatch("util/setMessage", data.data.error, { root: true });
			});
	},

	changePassword(context, payload) {
		payload.email = context.rootGetters["users/user"].email;
		UserService.changePassword(payload)
			.then(data => {
				context.dispatch("util/setMessage", data.data.msg, { root: true });
			})
			.catch(data => {
				context.dispatch("util/setMessage", data.data.error, { root: true });
			});
	},

	createUser(context, payload) {
		payload.photo =
			"https://cdn-images-1.medium.com/max/1200/1*MccriYX-ciBniUzRKAUsAw.png";
		UserService.createUser(payload)
			.then(data => {
				context.dispatch("util/setMessage", data.data.msg, { root: true });
				router.push("login");
			})
			.catch(data => {
				context.dispatch("util/setMessage", data.data.error, { root: true });
			});
	},

	editUser(context, payload) {
		payload.email = context.getters.user.email;
		UserService.editUser(payload)
			.then(data => {
				localStorage.setItem("user", JSON.stringify(data.data.user));
				context.dispatch("util/setMessage", data.data.msg, { root: true });
				context.commit("SET_USER", data.data.user);
			})
			.catch(data => {
				context.dispatch("util/setMessage", data.data.error, { root: true });
			});
	},

	recoveryPassword(context, payload) {
		UserService.recoveryPassword(payload)
			.then(data => {
				console.log(data);
				context.dispatch("util/setMessage", data.data.msg, { root: true });
			})
			.catch(data => {
				context.dispatch("util/setMessage", data.msg, { root: true });
			});
	},

	logout(context) {
		localStorage.removeItem("user");
		UserService.logout()
			.then(data => {
				router.push("login");
			})
			.catch(data => {
				context.dispatch("util/setMessage", data.data.error, { root: true });
			});
	}
};
const getters = {
	user_id(state) {
		return state.user.id;
	},
	user(state) {
		return state.user;
	}
};
const mutations = {
	SET_USER(state, payload) {
		state.user = payload;
	}
};

export const users = {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
};
