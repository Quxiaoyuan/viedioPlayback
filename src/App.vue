<template>
  <div id="app">
    <div class="app-header" :class="isLogin ? 'flex-header' : ''">
        <el-tabs v-if="isLogin" v-model="activeName" @tab-click="tabHandleClick">
            <el-tab-pane class="app-el-tab" label="首页" name="home"></el-tab-pane>
            <el-tab-pane class="app-el-tab" label="收藏" name="favorite"></el-tab-pane>
            <el-tab-pane class="app-el-tab" label="历史" name="history"></el-tab-pane>
        </el-tabs>
        <div v-if="!isLogin">
            <el-button type="primary" @click="toLogin">登录</el-button>
            <el-button @click="toRegister">注册</el-button>
        </div>
        <div v-else>
            <el-button @click="logOutHandle">退出</el-button>
        </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'App',
    data() {
        return {
            activeName: 'home'
        }
    },
    computed: {
        ...mapState({
            isLogin: state => state.isLogin
        })
    },
    created() {
        this.checkAuth();
    },
    methods: {
        ...mapMutations({
            updateLoginHandle: 'updateLoginStatus'
        }),
        toLogin() {
            this.$router.push({path: "/login"});
        },
        toRegister() {
            this.$router.push({path: "/register"});
        },
        logOutHandle() {
            this.$router.push({path: '/login'});
            this.updateLoginHandle(false);
        },
        tabHandleClick() {

        },
        checkAuth() {
            if (this.isLogin) {
                debugger;
                const params = {
                    objectId: ''
                };
                const res = this.$store.dispatch('queryUserInfo', params);
                if (res) {
                    debugger;
                }
            }
        }
    }
}
</script>

<style lang="less">
html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f6f6f6;
    position: relative;
}
.app-header {
    width: 100%;
    background-image: linear-gradient(168deg, #FEFD42 0%, #FFF9BE 100%);
    box-sizing: border-box;
    padding: 10px 24px 10px 160px;
    display: flex;
    justify-content: flex-end;
    & /deep/ .el-tabs__nav div[role] {
        width: 100px;
        height: 60px;
        font-size: 20px;
        text-align: center;
    }
}
.flex-header {
    justify-content: space-between;
}
</style>
