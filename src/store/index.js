import  Api from '@/api';
import Vue from 'vue'
import Vuex from 'vuex';

const state = {
	// isLogin: false,
	isLogin: false, // 测试，默认为登录成功
  userInfo: {},
  cardList: [],
  collectList: [],
  attentionList: []
};
const mutations = {
    updateLoginStatus({ commit }, params) {
      state.isLogin = params;
    },
    updateUserInfo({ commit }, params) {
      state.userInfo = params;
    },
    updataList({ commit }, params) {
      state[params.listType] = params.data;
    },
    updateListCommentProp({ commit }, params) {
      state[params].forEach((item) => {
        Vue.set(item, 'showComment', false);
        Vue.set(item, 'commentList', []);
      })
    },
    updateListProp({ commit }, params) {
      Vue.set(state[params.listType][params.index], params.key, params.value)
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
    async dynamicList({ commit }, params) {
			const res = await Api.dynamicList(params);
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
    },
    async cancelFavorite({ commit }, params) {
      const res = await Api.cancelFavorite(params);
      return res;
    },
    async queryUserInfo({ commit }, params) {
      const res = await Api.queryUserInfo(params);
      return res
    },
    async updateUserInfo({ commit }, params) {
      const res = await Api.updateUserInfo(params);
      return res;
    },
    async attentionOther({ commit }, params) {
      const res = await Api.attentionOther(params);
      return res;
    },
    async myAttention({ commit }, params) {
      const res = await Api.myAttention(params);
      return res;
    },
    async cancelAttention({ commit }, params) {
      const res = await Api.cancelAttention(params);
      return res;
    }
};

Vue.use(Vuex);
export default new Vuex.Store({
	state,
	mutations,
	actions
});