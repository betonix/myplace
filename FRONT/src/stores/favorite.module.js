import FavoriteService from "../services/FavoriteService";

const state = {};

const actions = {
	saveFavorite(context, payload) {
		let user_id = context.rootGetters["users/user_id"];
		FavoriteService.saveFavorite(payload, user_id).then(data => {
			context.dispatch("place/updatePlaceFavorite", true, { root: true });
		});
	},
	removeFavorite(context, payload) {
		let user_id = context.rootGetters["users/user_id"];
		FavoriteService.removeFavorite(payload, user_id).then(data => {
			context.dispatch("place/updatePlaceFavorite", false, { root: true });
		});
	}
};

const mutations = {};

export const favorite = {
	namespaced: true,
	state,
	actions,
	mutations
};
