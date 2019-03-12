import GeoLocation from "../services/GeoLocation";
import PlaceService from "../services/PlaceService";

const state = {
	position: {},
	places: [],
	currentPlace: {}
};

const actions = {
	getPosition(context) {
		GeoLocation.GEO().then(data => {
			context.commit("SET_POSITION", data);
			PlaceService.getPlacesNear(data).then(places => {
				context.commit("GET_PLACES", places);
			});
		});
	},

	getPlaceDetail(context, payload) {
		let user_id = context.rootGetters["users/user_id"];
		PlaceService.getPlaceDetail(payload, user_id).then(data => {
			context.commit("SET_CURRENTE_PLACE", data);
		});
	},

	updateCurrentePlaceReview(context, payload) {
		payload.user = context.rootGetters["users/user"];
		context.commit("UPDATE_PLACE_REVIEW", payload);
	},

	updatePlaceFavorite(context, payload) {
		context.commit("UPDATE_PLACE_FAVORITE", payload);
	},

	updateCurrentePlace(context, payload) {
		context.commit("SET_CURRENTE_PLACE", payload);
	}
};
const mutations = {
	SET_POSITION(state, payload) {
		state.position = { position: payload };
	},

	UPDATE_PLACE_REVIEW(state, payload) {
		state.currentPlace.reviews = [...state.currentPlace.reviews, payload];
	},

	UPDATE_PLACE_FAVORITE(state, payload) {
		state.currentPlace.isfavorite = payload;
	},

	SET_CURRENTE_PLACE(state, payload) {
		state.currentPlace = payload;
	},

	GET_PLACES(state, payload) {
		payload.filter(item => {
			let place = {
				position: item.geometry.location,
				place_id: item.place_id,
				name: item.name,
				icon: {
					url: item.icon, // url,
					size: { width: 46, height: 46, f: "px", b: "px" },
					scaledSize: { width: 23, height: 23, f: "px", b: "px" }
				}
			};
			state.places.push(place);
		});
	}
};

export const place = {
	namespaced: true,
	state,
	actions,
	mutations
};
