import  Api from '@/api';
import Vue from 'vue'
import Vuex from 'vuex';

const state = {
    isLogin: false
};
const mutations = {
    updateLoginStatus({ commit }, params) {
        state.isLogin = params;
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
    }
};

Vue.use(Vuex);
export default new Vuex.Store({
    state,
    mutations,
    actions
});