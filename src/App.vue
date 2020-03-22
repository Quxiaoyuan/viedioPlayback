<template>
  <div id="app">
    <div class="app-header" :class="isLogin ? 'flex-header' : ''">
			<nav>
				<el-menu :default-active="activeNavIndex"
								mode="horizontal"
								class="el-menu-demo"
								background-color="#39f" 
								text-color="white"
								active-text-color="sandybrown"
								@select="handleNavSelect">
					<el-menu-item index="myHomePage">我的主页</el-menu-item>
					<el-menu-item index="myCollectPage">我的收藏</el-menu-item>
					<el-menu-item index="myHistoryPage">历史记录</el-menu-item>
					<!-- <el-menu-item index="personalPage">个人中心</el-menu-item> -->
				</el-menu>
			</nav>

      <div v-if="!isLogin">
        <el-button type="primary" @click="toLogin">登录</el-button>
        <el-button @click="toRegister">注册</el-button>
      </div>
      <div class="personal-center" v-else>		
        <el-dropdown @command="handleCommandFn">
          <span class="el-dropdown-link">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personal">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

		<div class="app-content">
			<router-view />
		</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {
			activeName: "home",
			activeNavIndex: 'myHomePage'
    };
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
      updateLoginHandle: "updateLoginStatus"
    }),
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    toRegister() {
      this.$router.push({ path: "/register" });
    },
    logOutHandle() {
      this.$router.push({ path: "/login" });
      this.updateLoginHandle(false);
    },
    tabHandleClick() {},
    checkAuth() {
      if (this.isLogin) {
        // debugger;
        const params = {
          objectId: ""
        };
        const res = this.$store.dispatch("queryUserInfo", params);
        if (res) {
          // debugger;
        }
      }
		},
		handleCommandFn(curPage){
			const _this = this;
			switch(curPage){
				case 'personal':_this.$router.push({name:"personalPage"});
												_this.activeNavIndex = 'personalPage';
				break;
				default:''
			}
		},
		handleNavSelect(key, keyPath){
			const _this = this;
			switch(key){
				case 'myHomePage':this.$router.push({name:'home'})
				break;
				case 'myCollectPage':this.$router.push({name:'collectPage'})
				break;
				case 'myHistoryPage':this.$router.push({name:'historyPage'})
				break;
				default:""
			}	
		}
  }
};
</script>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
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
	// background-image: linear-gradient(168deg, #fefd42 0%, #fff9be 100%);
	background: #3399ff;
	color:#fff;	
  box-sizing: border-box;
  // padding: 10px 24px 10px 160px;
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
	align-items: center;
	padding:0 272px;
	.personal-center{
		.el-dropdown-link{
			display: inline-block;
			background: url('~@/assets/tutu.png') no-repeat 0 0;
			width: 50px;
			height: 50px;
			background-size: cover;
			border-radius: 50%;	
			cursor:pointer;
		}
	}
}
.app-content{
	width: 66%;
  height: 100%;
  padding: 0 16px;
  margin: 10px auto;
}
</style>