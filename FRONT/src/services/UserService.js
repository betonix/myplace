import Api from "@/services/Api";

export default {
	loginEmail(user) {
		return new Promise((resolve, reject) => {
			Api()
				.post("/auth/login", user)
				.then(function(response) {
					resolve(response);
				})
				.catch(error => {
					reject(error.response);
				});
		});
	},
	createUser(user) {
		return new Promise((resolve, reject) => {
			Api()
				.post("/auth/register", user)
				.then(function(response) {
					resolve(response);
				})
				.catch(error => {
					reject(error.response);
				});
		});
	},

	loginFacebook(token) {
		return new Promise((resolve, reject) => {
			Api()
				.post("/auth/loginFacebook", { access_token: token })
				.then(function(response) {
					resolve(response);
				})
				.catch(error => {
					reject(error);
				});
		});
	},
	changePassword(payload) {
		return new Promise((resolve, reject) => {
			Api()
				.post("/auth/changePassword", payload)
				.then(function(response) {
					resolve(response);
				})
				.catch(error => {
					reject(error.response);
				});
		});
	},

	editUser(payload) {
		return new Promise((resolve, reject) => {
			Api()
				.post("/auth/editUser", payload)
				.then(function(response) {
					resolve(response);
				})
				.catch(error => {
					reject(error.response);
				});
		});
	},

	recoveryPassword(payload) {
		return new Promise((resolve, reject) => {
			Api()
				.post("/auth/recovery", payload)
				.then(function(response) {
					resolve(response);
				})
				.catch(error => {
					reject(error);
				});
		});
	},

	logout() {
		return new Promise((resolve, reject) => {
			Api()
				.get("/auth/logout")
				.then(function(response) {
					resolve(response);
				})
				.catch(error => {
					reject(error.response);
				});
		});
	}
};
