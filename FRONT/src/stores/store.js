import Vue from "vue";
import vuex from "vuex";
import { users } from "./users.module";
import { util } from "./util.module";
import { place } from "./place.module";
import { review } from "./review.module";
import { favorite } from "./favorite.module";
Vue.use(vuex);

export default new vuex.Store({
	modules: {
		users,
		util,
		place,
		review,
		favorite
	}
});
