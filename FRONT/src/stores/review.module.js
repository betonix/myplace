import ReviewService from "../services/ReviewService";

const state = {};

const actions = {
	saveReview(context, payload) {
		payload["user_id"] = context.rootGetters["users/user_id"];
		ReviewService.saveReview(payload).then(data => {
			context.dispatch("place/updateCurrentePlaceReview", payload, {
				root: true
			});
			context.dispatch("util/setMessage", data.data.msg, { root: true });
		});
	}
};

const mutations = {};

export const review = {
	namespaced: true,
	state,
	actions,
	mutations
};
