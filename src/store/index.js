import  Api from '@/api';
import Vue from 'vue'
import Vuex from 'vuex';

const state = {
	// isLogin: false,
	isLogin:true, // 测试，默认为登录成功
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
    async dynamicList({ commit }) {
			const res = await Api.dynamicList();
			return res;
    }
};

Vue.use(Vuex);
export default new Vuex.Store({
	state,
	mutations,
	actions
});