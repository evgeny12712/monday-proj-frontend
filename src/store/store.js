import Vue from 'vue';
import Vuex from 'vuex';
import { boardStore } from './board.store.js';
import { userStore } from './user.store.js';
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLoading: false,
	},
	getters: {
		isLoading: (state) => state.isLoading,
	},
	mutations: {
		setLoading(state, { isLoading }) {
			state.isLoading = isLoading;
		},
	},
	modules: {
		boardStore,
		userStore,
	},
});
