import  Api from '@/api';
import Vue from 'vue'
import Vuex from 'vuex';

const state = {
	// isLogin: false,
	isLogin: false, // 测试，默认为登录成功
	userInfo: {}
};
const mutations = {
    updateLoginStatus({ commit }, params) {
      state.isLogin = params;
    },
    updateUserInfo({ commit }, params) {
      state.userInfo = params;
    }
};
const actions = {
    async loginAction({ commit }, params) {
			const res = await Api.login(params);
			return res;
    },
    async registerAction({ commit }, params) {
			const res = await Api.register(params);
			return res;
    },
    async dynamicPost({ commit }, params) {
			const res = await Api.dynamicPost(params);
			return res;
    },
    async dynamicList({ commit }) {
			const res = await Api.dynamicList();
			return res;
    },
    async commentInput({ commit }, params) {
      const res = await Api.commentInput(params);
			return res;
    },
    async addcommentDynamic({ commit }, params) {
      const res = await Api.addcommentDynamic(params);
      return res;
    },
    async addcomment({ commit }, params) {
      const res = await Api.addcomment(params);
      return res;
    },
    async addFavorite({ commit }, params) {
      const res = await Api.addFavorite(params);
      return res;
    },
    async myFavorite({ commit }, params) {
      const res = await Api.myFavorite(params);
      return res;
    }
};

Vue.use(Vuex);
export default new Vuex.Store({
	state,
	mutations,
	actions
});