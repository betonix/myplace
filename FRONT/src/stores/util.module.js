const state = {
	accessToken: localStorage.getItem("access_token") || "",
	loading: false,
	modalOpened: false,
	message: ""
};

const actions = {
	openModal(context, payload) {
		context.commit("OPEN_MODAL");
		context.dispatch("place/getPlaceDetail", payload, { root: true });
	},
	closeModal(context) {
		context.commit("CLOSE_MODAL");
		context.dispatch("place/updateCurrentePlace", {}, { root: true });
	},
	setLoading(context, payload) {
		context.commit("CLOSE_MODAL", payload);
	},
	setMessage(context, payload) {
		context.commit("SET_MESSAGE", payload);
	}
};

const mutations = {
	CLOSE_MODAL(state, payload) {
		state.modalOpened = false;
	},
	OPEN_MODAL(state, payload) {
		state.modalOpened = true;
	},
	SET_LOADING(state, payload) {
		state.loading = payload;
	},
	SET_MESSAGE(state, payload) {
		state.message = payload;
	}
};

export const util = {
	namespaced: true,
	state,
	actions,
	mutations
};
