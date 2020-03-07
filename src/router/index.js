import Vue from 'vue'
import Router from 'vue-router'
const login = () => import('@/views/login/index');
const register = () => import('@/views/register/index');
const home = () => import('@/views/home');

Vue.use(Router);

export default new Router({
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
        }
    ]
})
