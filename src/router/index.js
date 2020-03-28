import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';
const login = () => import('@/views/login/index'); // 登录
const register = () => import('@/views/register/index'); // 注册
const home = () => import('@/views/home'); // 我的而主页
const editArticle = () => import('@/views/editArticle'); // 编辑评论
const collectPage = () => import('@/views/collectPage'); // 我的收藏
const historyPage = () => import('@/views/historyPage'); // 历史记录
const personalPage = () => import('@/views/personalPage'); // 个人中心
const myAttention = () => import('@/views/myAttention');

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			redirect: '/login',
		},
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/register',
			name: 'register',
			component: register
		},
		{
			path: '/home',
			name: 'home',
			component: home
		},
		{
			path: '/editArticle',
			name: 'editArticle',
			component: editArticle
		},
		{
			path:'/collectPage',
			name:'collectPage',
			component:collectPage
		},
		{
			path:'/historyPage',
			name:'historyPage',
			component:historyPage
		},
		{	
			path:'/personalPage',
			name:'personalPage',
			component:personalPage
		},
		{	
			path:'/myAttention',
			name:'myAttention',
			component:myAttention
		}
	]
})

router.beforeEach((to, from, next) => {
	const isLogin = store.state.isLogin;
	if (isLogin) {
		if (to.name === 'login' || to.name === 'register') {
			next(false);
		} else {
			next();
		}
	} else {
		if (to.name === 'login' || to.name === 'register') {
			next();
		} else {
			next({path: '/login'});
		}
	}
})

export default router
